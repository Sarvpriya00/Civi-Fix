import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Navigation } from '@/components/ui/navigation';
import { RoleGuard } from '@/components/auth/role-guard';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { useReportStore } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';
import { ISSUE_CATEGORIES, getCategoryById } from '@/lib/categories';
import { calculateSeverity, SeverityInputs } from '@/lib/severity';
import { toast } from '@/hooks/use-toast';
import { 
  Camera, 
  MapPin, 
  FileText, 
  Calculator,
  Upload
} from 'lucide-react';

const reportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  photoUrl: z.string().optional(),
  address: z.string().min(5, 'Please provide a valid address'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

type ReportForm = z.infer<typeof reportSchema>;

export default function CitizenReport() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const { addReport } = useReportStore();
  
  const [severityInputs, setSeverityInputs] = useState<SeverityInputs>({
    is_hotspot: false,
    upvotes: 0,
    radius: 50,
    location_boost: 10,
    sentiment: 3,
    user_severity: 2,
    weather_boost: 0,
    category_combo: 5,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReportForm>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Bangalore, Karnataka',
    },
  });

  const selectedCategory = watch('category');
  const severityResult = selectedCategory 
    ? calculateSeverity(selectedCategory, severityInputs)
    : null;

  const handleLocationDetect = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue('latitude', position.coords.latitude);
          setValue('longitude', position.coords.longitude);
          setValue('address', `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
          toast({
            title: "Location detected",
            description: "Your current location has been set.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Could not detect your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const onSubmit = async (data: ReportForm) => {
    if (!currentUser || !selectedCategory) return;

    try {
      const category = getCategoryById(selectedCategory);
      if (!category) throw new Error('Invalid category');

      const severity = calculateSeverity(selectedCategory, severityInputs);

      addReport({
        title: data.title,
        category: selectedCategory,
        departmentHint: category.department,
        photoUrl: data.photoUrl,
        location: {
          lat: data.latitude,
          lng: data.longitude,
          address: data.address,
        },
        description: data.description,
        userId: currentUser.id,
        status: 'Open',
        upvotes: 0,
        inputs: severityInputs,
        score: severity.score,
        priority: severity.priority,
      });

      toast({
        title: "Report submitted successfully!",
        description: `Your ${category.name.toLowerCase()} report has been submitted with ${severity.priority} priority.`,
      });

      navigate('/citizen/my-reports');
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <RoleGuard requiredRole="citizen">
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
            <p className="text-muted-foreground">
              Tell us what's wrong: pick a category, add a photo, and describe the issue.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Issue Details
                  </CardTitle>
                  <CardDescription>
                    Provide clear details to help us address your issue quickly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Issue Title</Label>
                      <Input
                        id="title"
                        placeholder="Brief description of the issue"
                        {...register('title')}
                      />
                      {errors.title && (
                        <p className="text-sm text-destructive">{errors.title.message}</p>
                      )}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setValue('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select issue category" />
                        </SelectTrigger>
                        <SelectContent>
                          {ISSUE_CATEGORIES.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-destructive">{errors.category.message}</p>
                      )}
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo (Optional)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Take a photo to help us understand the issue
                        </p>
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </Button>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                      <Label>Location</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="latitude" className="text-xs">Latitude</Label>
                          <Input
                            id="latitude"
                            type="number"
                            step="any"
                            {...register('latitude', { valueAsNumber: true })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="longitude" className="text-xs">Longitude</Label>
                          <Input
                            id="longitude"
                            type="number"
                            step="any"
                            {...register('longitude', { valueAsNumber: true })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address" className="text-xs">Address</Label>
                        <Input
                          id="address"
                          placeholder="Street address or landmark"
                          {...register('address')}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={handleLocationDetect}
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          Detect Current Location
                        </Button>
                      </div>
                      {errors.address && (
                        <p className="text-sm text-destructive">{errors.address.message}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about the issue, including when you noticed it and any safety concerns..."
                        rows={4}
                        {...register('description')}
                      />
                      {errors.description && (
                        <p className="text-sm text-destructive">{errors.description.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Severity Calculator */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Priority Score
                  </CardTitle>
                  <CardDescription>
                    Help us prioritize by providing additional context
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Hotspot Toggle */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hotspot" className="text-sm">
                      High-traffic area?
                    </Label>
                    <Switch
                      id="hotspot"
                      checked={severityInputs.is_hotspot}
                      onCheckedChange={(checked) =>
                        setSeverityInputs(prev => ({ ...prev, is_hotspot: checked }))
                      }
                    />
                  </div>

                  {/* User Severity */}
                  <div className="space-y-2">
                    <Label className="text-sm">
                      How severe is this issue? ({severityInputs.user_severity}/4)
                    </Label>
                    <Slider
                      value={[severityInputs.user_severity]}
                      onValueChange={([value]) =>
                        setSeverityInputs(prev => ({ ...prev, user_severity: value }))
                      }
                      max={4}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Radius */}
                  <div className="space-y-2">
                    <Label className="text-sm">
                      Affected area radius ({severityInputs.radius}m)
                    </Label>
                    <Slider
                      value={[severityInputs.radius]}
                      onValueChange={([value]) =>
                        setSeverityInputs(prev => ({ ...prev, radius: value }))
                      }
                      max={250}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Location Boost */}
                  <div className="space-y-2">
                    <Label className="text-sm">
                      Near important facility? ({severityInputs.location_boost}/20)
                    </Label>
                    <Slider
                      value={[severityInputs.location_boost]}
                      onValueChange={([value]) =>
                        setSeverityInputs(prev => ({ ...prev, location_boost: value }))
                      }
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Priority Preview */}
                  {severityResult && (
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Priority Level:</span>
                        <PriorityBadge priority={severityResult.priority} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Score:</span>
                        <span className="text-sm font-mono">{severityResult.score}/100</span>
                      </div>
                      {selectedCategory && (
                        <div className="text-xs text-muted-foreground">
                          Department: {getCategoryById(selectedCategory)?.department}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}