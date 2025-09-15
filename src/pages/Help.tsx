import { Navigation } from '@/components/ui/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  HelpCircle, 
  FileText, 
  MapPin, 
  Users, 
  Shield,
  Clock,
  Camera
} from 'lucide-react';

export default function Help() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about using CivicFix effectively
          </p>
        </div>

        {/* Quick Start Guide */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>Get started with CivicFix in just a few steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-semibold">Create an Account</h3>
                    <p className="text-sm text-muted-foreground">Sign up or log in to start reporting issues</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-semibold">Report an Issue</h3>
                    <p className="text-sm text-muted-foreground">Take a photo, add location, and describe the problem</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-semibold">Track Progress</h3>
                    <p className="text-sm text-muted-foreground">Monitor your report status and receive updates</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h3 className="font-semibold">Engage Community</h3>
                    <p className="text-sm text-muted-foreground">Vote on issues and help prioritize community needs</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  How do I report an issue?
                </AccordionTrigger>
                <AccordionContent>
                  To report an issue, log in to your account and click "Report Issue" in the navigation. 
                  Fill out the form with details about the problem, take a photo if possible, and 
                  ensure your location is accurate. The more details you provide, the better 
                  municipal staff can respond to your report.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  How long does it take to resolve issues?
                </AccordionTrigger>
                <AccordionContent>
                  Resolution times vary depending on the issue type, severity, and available resources. 
                  High-priority safety issues are typically addressed within 24-48 hours, while 
                  routine maintenance may take several weeks. You can track the status of your 
                  report in real-time through your dashboard.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Why is location information important?
                </AccordionTrigger>
                <AccordionContent>
                  Accurate location data helps municipal staff locate and address issues quickly. 
                  It also enables the system to identify hotspots and patterns, helping improve 
                  city planning and resource allocation. Your location is automatically detected, 
                  but you can adjust it if needed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Do I need to include photos?
                </AccordionTrigger>
                <AccordionContent>
                  While photos aren't required, they significantly help staff understand and 
                  prioritize issues. Clear photos can speed up the resolution process by 
                  providing visual context that descriptions alone might miss.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  How does the voting system work?
                </AccordionTrigger>
                <AccordionContent>
                  Citizens can upvote issues they've also experienced or consider important. 
                  Higher vote counts help prioritize issues and show municipal staff which 
                  problems affect the most people. You can vote on issues in your area 
                  through the "Explore" section.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Is my personal information safe?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we take privacy seriously. Your personal information is protected and 
                  only used for report management and communication. Location data is used 
                  solely for issue resolution and city planning purposes. See our Privacy 
                  Policy for complete details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>What types of issues can I report?</AccordionTrigger>
                <AccordionContent>
                  You can report a wide range of civic issues including potholes, broken 
                  streetlights, garbage collection problems, water leaks, park maintenance, 
                  traffic concerns, and public health issues. If you're unsure whether 
                  something qualifies, go ahead and report it - staff will categorize 
                  and route it appropriately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Can I report issues anonymously?</AccordionTrigger>
                <AccordionContent>
                  Currently, you need an account to report issues as this helps with 
                  communication and follow-up. However, your contact information is 
                  only visible to municipal staff and is not shared publicly with 
                  other users.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>Contact our support team for additional assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Support Email</h3>
                <p className="text-muted-foreground">support@civicfix.demo</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Municipal Helpdesk</h3>
                <p className="text-muted-foreground">For urgent issues, contact your local municipal office directly</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Emergency Services</h3>
                <p className="text-muted-foreground">
                  For life-threatening emergencies, always call your local emergency number (e.g., 911, 108)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}