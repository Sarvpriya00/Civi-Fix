import { Navigation } from '@/components/ui/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We collect the following types of information:</p>
              
              <h4 className="font-semibold mt-4 mb-2">Personal Information</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name and email address for account creation</li>
                <li>Contact information for communication about reports</li>
                <li>User role and department (for municipal staff)</li>
              </ul>

              <h4 className="font-semibold mt-4 mb-2">Report Data</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Location data (GPS coordinates and addresses)</li>
                <li>Photos and descriptions of reported issues</li>
                <li>Timestamps and status updates</li>
                <li>User interactions (votes, comments)</li>
              </ul>

              <h4 className="font-semibold mt-4 mb-2">Technical Information</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Device information and browser type</li>
                <li>Usage patterns and interaction data</li>
                <li>Log files and error reports</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Process and route issue reports to appropriate municipal departments</li>
                <li>Provide updates on report status and resolution progress</li>
                <li>Identify patterns and hotspots for improved city planning</li>
                <li>Facilitate communication between citizens and municipal staff</li>
                <li>Improve the platform and develop new features</li>
                <li>Ensure platform security and prevent misuse</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We share information in the following circumstances:</p>
              
              <h4 className="font-semibold mt-4 mb-2">With Municipal Authorities</h4>
              <p>
                Report data is shared with relevant municipal departments to facilitate 
                issue resolution. This includes location data, photos, descriptions, 
                and contact information.
              </p>

              <h4 className="font-semibold mt-4 mb-2">Public Information</h4>
              <p>
                Issue locations, descriptions, and resolution status may be displayed 
                publicly on maps and lists to inform the community. Personal contact 
                information is never shared publicly.
              </p>

              <h4 className="font-semibold mt-4 mb-2">Legal Requirements</h4>
              <p>
                We may disclose information when required by law or to protect the 
                rights, property, or safety of CivicFix, users, or the public.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We implement appropriate technical and organizational measures to protect 
                your personal information against unauthorized access, alteration, 
                disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Staff training on data protection practices</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access your personal information and report data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your account and associated data</li>
                <li>Withdraw consent for data processing</li>
                <li>Export your data in a portable format</li>
                <li>Object to certain types of processing</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information 
                provided below.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We retain your information for as long as necessary to provide the 
                service and fulfill the purposes outlined in this policy. Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Account information is retained while your account is active</li>
                <li>Report data is retained for historical and planning purposes</li>
                <li>Resolved issues may be archived but remain accessible</li>
                <li>Technical logs are typically retained for 1-2 years</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Location Data</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Location data is essential for the functioning of CivicFix. We use 
                GPS coordinates and addresses to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Help municipal staff locate reported issues</li>
                <li>Display issues on maps for community awareness</li>
                <li>Identify patterns and hotspots in the city</li>
                <li>Route reports to appropriate departments</li>
              </ul>
              <p className="mt-4">
                You can disable location services, but this may limit the effectiveness 
                of issue reporting and resolution.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                CivicFix is not intended for children under 13 years of age. We do 
                not knowingly collect personal information from children under 13. 
                If we become aware that we have collected such information, we will 
                take steps to delete it promptly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update this Privacy Policy from time to time. We will notify 
                users of significant changes through the platform or by email. 
                Continued use of CivicFix after changes constitutes acceptance of 
                the updated policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                If you have questions about this Privacy Policy or how we handle 
                your information, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p>Email: privacy@civicfix.demo</p>
                <p>Address: CivicFix Demo Platform</p>
                <p>Data Protection Officer: dpo@civicfix.demo</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}