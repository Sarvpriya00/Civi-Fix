import { Navigation } from '@/components/ui/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <ScrollText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                By accessing and using CivicFix, you accept and agree to be bound by the terms 
                and provision of this agreement. This is a demonstration platform created for 
                educational and testing purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                CivicFix is a citizen issue reporting platform that connects community members 
                with municipal authorities. The service allows users to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Report civic issues with photos and location data</li>
                <li>Track the status of reported issues</li>
                <li>Engage with community members on local issues</li>
                <li>Access municipal staff tools for issue management</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Users agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide accurate and truthful information in reports</li>
                <li>Respect other users and municipal staff</li>
                <li>Use the platform only for legitimate civic issues</li>
                <li>Not submit false, misleading, or spam reports</li>
                <li>Comply with all applicable local laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Privacy and Data Collection</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We collect and process personal information as described in our Privacy Policy. 
                By using CivicFix, you consent to the collection and use of your information 
                for the purposes of providing the service.
              </p>
              <p className="mt-4">
                Location data is collected to help municipal staff locate and resolve reported 
                issues. Photos and descriptions are shared with relevant municipal departments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Content and Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Users retain ownership of content they submit, including photos and descriptions. 
                By submitting content, you grant CivicFix and participating municipalities a 
                license to use this content for the purpose of addressing reported issues.
              </p>
              <p className="mt-4">
                The CivicFix platform, software, and associated materials are protected by 
                intellectual property rights and remain the property of their respective owners.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                CivicFix is provided "as is" without any warranties, express or implied. 
                We do not guarantee that the service will be uninterrupted, secure, or 
                error-free. This is a demonstration platform and should not be used for 
                actual emergency situations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                In no event shall CivicFix or its operators be liable for any indirect, 
                incidental, special, consequential, or punitive damages arising from your 
                use of the platform. This includes but is not limited to loss of data, 
                loss of profits, or business interruption.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Emergency Situations</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="font-semibold text-destructive">
                IMPORTANT: CivicFix is not intended for emergency situations. In case of 
                life-threatening emergencies, always contact your local emergency services 
                directly (911, 108, or your local emergency number).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We reserve the right to modify these terms at any time. Continued use of 
                the platform after changes constitutes acceptance of the new terms. 
                We will notify users of significant changes through the platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4">
                Email: legal@civicfix.demo<br />
                Address: CivicFix Demo Platform
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}