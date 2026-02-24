import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

const SENDER = {
  email: process.env.BREVO_SENDER_EMAIL!,
  name: process.env.BREVO_SENDER_NAME!,
};

class EmailService {
  private async send(to: string, subject: string, htmlContent: string) {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = SENDER;
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  private getTrialEndDate(): string {
    const date = new Date();

    date.setDate(date.getDate() + 7);

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  async sendVerificationCode(email: string, code: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Verify Your Email</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Use this code to verify your email address:</p>
        <div style="background:#f9fafb;border-radius:8px;padding:24px;text-align:center;margin-bottom:32px;">
          <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#111827;">${code}</div>
        </div>
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#9ca3af;">This code expires in 24 hours.</p>
        <p style="margin:0;font-size:14px;line-height:20px;color:#9ca3af;">If you didn't request this, ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Verify Your Email - FE-1 Made Simple', html);
  }

  async sendTrialEndingReminder(email: string, firstName: string | null, trialEndDate: Date | null) {
    const formattedDate = trialEndDate
      ? new Date(trialEndDate).toLocaleDateString('en-IE', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'soon';

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Trial is Ending Soon</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Your Trial Ends in 3 Days</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#6b7280;">Your 7-day free trial of FE-1 Made Simple is ending on <strong>${formattedDate}</strong>.</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">To continue enjoying unlimited access to all features, make sure your payment method is ready. You'll be charged <strong>€9.99/month</strong> starting ${formattedDate}.</p>
        
        <div style="background:#f9fafb;border-radius:8px;padding:24px;margin-bottom:32px;">
          <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#111827;">What You'll Keep:</p>
          <ul style="margin:0;padding-left:20px;font-size:14px;line-height:24px;color:#6b7280;">
            <li>Access to all 8 FE-1 subjects</li>
            <li>Unlimited practice questions</li>
            <li>AI-powered essay feedback</li>
            <li>Progress tracking & analytics</li>
            <li>Past exam questions</li>
          </ul>
        </div>

        <div style="text-align:center;margin-bottom:24px;">
          <a href="${process.env.FRONTEND_URL}/subscription" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;">Manage Subscription</a>
        </div>

        <p style="margin:0;font-size:14px;line-height:20px;color:#9ca3af;text-align:center;">Don't want to continue? You can cancel anytime before ${formattedDate}.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Your Trial Ends in 3 Days - FE-1 Made Simple', html);
  }

  async sendPasswordResetCode(email: string, code: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Reset Your Password</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Use this code to reset your password:</p>
        <div style="background:#f9fafb;border-radius:8px;padding:24px;text-align:center;margin-bottom:32px;">
          <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#111827;">${code}</div>
        </div>
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#9ca3af;">This code expires in 1 hour.</p>
        <p style="margin:0;font-size:14px;line-height:20px;color:#9ca3af;">If you didn't request this, ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Reset Your Password - FE-1 Made Simple', html);
  }

  async sendWelcomeEmail(email: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FE-1 Made Simple</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Welcome to FE-1 Made Simple!</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#6b7280;">Your email has been verified successfully! You now have full access to all features.</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Your <strong>7-day free trial</strong> has started. Explore our comprehensive FE-1 exam preparation materials and start your journey to success.</p>
        <div style="text-align:center;margin-bottom:32px;">
          <a href="${process.env.FRONTEND_URL}/dashboard" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;">Go to Dashboard</a>
        </div>
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#6b7280;"><strong>What's next?</strong></p>
        <ul style="margin:0;padding-left:20px;font-size:14px;line-height:24px;color:#6b7280;">
          <li>Browse our 8 FE-1 subjects</li>
          <li>Practice with past exam questions</li>
          <li>Get AI feedback on your essays</li>
          <li>Track your progress</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Welcome to FE-1 Made Simple! ', html);
  }

  async sendWelcomeEmailWithTrial(email: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FE-1 Made Simple</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Welcome to FE-1 Made Simple! 🎉</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#6b7280;">Congratulations! Your email has been verified successfully and your account is now fully activated.</p>
        
        <!-- Trial Banner -->
        <div style="background:#f0f9ff;border:2px solid #2563eb;border-radius:8px;padding:20px;margin:24px 0;">
          <p style="margin:0 0 8px;font-size:18px;font-weight:600;color:#1e40af;">🚀 Your 7-Day Free Trial Has Started!</p>
          <p style="margin:0;font-size:14px;line-height:20px;color:#1e40af;">Enjoy full access to all premium features until <strong>${this.getTrialEndDate()}</strong>. No credit card required.</p>
        </div>

        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Explore our comprehensive FE-1 exam preparation materials and start your journey to success today.</p>
        
        <div style="text-align:center;margin-bottom:32px;">
          <a href="${process.env.FRONTEND_URL}/dashboard" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;">Go to Dashboard</a>
        </div>
        
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#111827;font-weight:600;">What you get during your trial:</p>
        <ul style="margin:0;padding-left:20px;font-size:14px;line-height:24px;color:#6b7280;">
          <li><strong>All 8 FE-1 Subjects</strong> - Complete access to every topic</li>
          <li><strong>Past Exam Questions</strong> - Practice with real questions from previous years</li>
          <li><strong>AI Essay Feedback</strong> - Get instant feedback on your practice essays</li>
          <li><strong>Interactive Quizzes</strong> - Test your knowledge with MCQs</li>
          <li><strong>Case Law Library</strong> - Search and reference key cases</li>
          <li><strong>Progress Tracking</strong> - Monitor your preparation journey</li>
        </ul>
        
        <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin:24px 0;border-radius:4px;">
          <p style="margin:0;font-size:14px;line-height:20px;color:#92400e;">
            <strong>💡 Pro Tip:</strong> Make the most of your trial by setting up your study goals in the onboarding flow. This helps us personalize your learning experience!
          </p>
        </div>
        
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#6b7280;">Need help getting started? Check out our <a href="${process.env.FRONTEND_URL}/help" style="color:#2563eb;text-decoration:none;">Quick Start Guide</a>.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Have questions? <a href="mailto:support@fe1madesimple.com" style="color:#2563eb;text-decoration:none;">Contact our support team</a></p>
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Welcome to FE-1 Made Simple - Your 7-Day Trial Has Started!', html);
  }

  async sendAccountDeletionEmail(email: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Deleted</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Account Successfully Deleted</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#6b7280;">Your FE-1 Made Simple account has been permanently deleted as requested. All your personal data has been removed from our systems.</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#6b7280;">We're sorry to see you go, and we truly appreciate the time you spent with us. Your feedback helps us improve and serve future students better.</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">If your circumstances change, we'd be honored to welcome you back. You can create a new account anytime at <a href="https://fe1madesimple.com" style="color:#2563eb;text-decoration:none;">fe1madesimple.com</a>.</p>
        <div style="background:#f9fafb;border-radius:8px;padding:24px;margin-bottom:32px;">
          <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#6b7280;font-weight:600;">Need help?</p>
          <p style="margin:0;font-size:14px;line-height:20px;color:#6b7280;">If this deletion was a mistake or you have questions, contact us at <a href="mailto:support@fe1madesimple.com" style="color:#2563eb;text-decoration:none;">support@fe1madesimple.com</a> within 30 days.</p>
        </div>
        <p style="margin:0;font-size:16px;line-height:24px;color:#6b7280;">We wish you all the best in your FE-1 exam journey and future legal career.</p>
        <p style="margin:16px 0 0;font-size:16px;line-height:24px;color:#6b7280;">Best regards,<br><strong>The FE-1 Made Simple Team</strong></p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Your Account Has Been Deleted - FE-1 Made Simple', html);
  }

  async sendPaymentFailedEmail(email: string, firstName: string | null, failureReason: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Failed</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#dc2626;">Payment Failed</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#6b7280;">We were unable to process your payment for FE-1 Made Simple.</p>
        
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:20px;margin-bottom:32px;">
          <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#991b1b;">Reason:</p>
          <p style="margin:0;font-size:14px;line-height:20px;color:#7f1d1d;">${failureReason}</p>
        </div>

        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Please update your payment method to continue enjoying FE-1 Made Simple.</p>

        <div style="text-align:center;margin-bottom:24px;">
          <a href="${process.env.FRONTEND_URL}/subscription" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;">Update Payment Method</a>
        </div>

        <p style="margin:0;font-size:14px;line-height:20px;color:#9ca3af;">If you have any questions, please contact our support team.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Payment Failed - Action Required - FE-1 Made Simple', html);
  }

  async sendWeeklyProgressEmail(email: string, firstName: string, stats: any) {
    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Your Weekly Progress</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Here's how you performed this week:</p>
        
        <div style="background:#f9fafb;border-radius:8px;padding:24px;margin-bottom:16px;">
          <div style="margin-bottom:16px;">
            <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Study Time</div>
            <div style="font-size:24px;font-weight:700;color:#111827;">${Math.floor(stats.studyTimeSeconds / 3600)}h ${Math.floor((stats.studyTimeSeconds % 3600) / 60)}m</div>
          </div>
          <div style="margin-bottom:16px;">
            <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Current Streak</div>
            <div style="font-size:24px;font-weight:700;color:#111827;">${stats.streak} days 🔥</div>
          </div>
          <div>
            <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Essays Completed</div>
            <div style="font-size:24px;font-weight:700;color:#111827;">${stats.essaysCompleted}</div>
          </div>
        </div>
        
        <a href="https://fe1madesimple.com/dashboard" style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">View Full Dashboard</a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(
      email,
      `Your Weekly Progress - ${stats.studyTimeSeconds > 0 ? 'Great Work!' : "Let's Get Started!"}`,
      html
    );
  }

  async sendStreakAlertEmail(email: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Don't Break Your Streak! 🔥</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">You haven't studied today yet. Even 10 minutes can make a difference in keeping your momentum going!</p>
        <a href="https://fe1madesimple.com/subjects" style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Start Studying</a>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Keep Your Streak Alive! - FE-1 Made Simple', html);
  }

  async sendPodcastRecommendations(email: string, firstName: string, podcasts: any[]) {
    const podcastsHtml = podcasts
      .map(
        (p) => `
    <div style="margin-bottom:16px;padding:16px;background:#f9fafb;border-radius:8px;">
      <div style="font-weight:600;color:#111827;margin-bottom:4px;">${p.title}</div>
      <div style="font-size:14px;color:#6b7280;">${p.subject || 'General'} • ${Math.round((p.duration || 0) / 60)} mins</div>
    </div>
  `
      )
      .join('');

    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Podcasts for You 🎙️</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Check out these podcast episodes tailored to your study focus:</p>
        ${podcastsHtml}
        <a href="https://fe1madesimple.com/library/podcasts" style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px;">Browse All Podcasts</a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'New Podcast Recommendations - FE-1 Made Simple', html);
  }

  // Add to src/modules/email/services/email.service.ts

  async sendAIProgressTrendEmail(email: string, firstName: string, data: any) {
    const improvementText =
      data.improvement > 0
        ? `<span style="color:#10b981;">↑ ${data.improvement}%</span>`
        : data.improvement < 0
          ? `<span style="color:#ef4444;">↓ ${Math.abs(data.improvement)}%</span>`
          : `<span style="color:#6b7280;">No change</span>`;

    const subjectRows = Object.entries(data.subjectPerformance)
      .map(
        ([subject, perf]: [string, any]) => `
      <tr>
        <td style="padding:12px;border-bottom:1px solid #e5e7eb;">${subject}</td>
        <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center;">${perf.count}</td>
        <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:center;font-weight:600;">${perf.avgScore}%</td>
      </tr>
    `
      )
      .join('');

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Progress Report</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 8px;font-size:24px;font-weight:600;color:#111827;">Your Weekly AI Progress Report 📊</h1>
        <p style="margin:0 0 32px;font-size:14px;color:#6b7280;">Week of ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        
        <div style="background:#f9fafb;border-radius:12px;padding:24px;margin-bottom:32px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <div>
              <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Last Week Average</div>
              <div style="font-size:32px;font-weight:700;color:#111827;">${data.lastWeekAverage}%</div>
            </div>
            <div style="font-size:24px;font-weight:700;">${improvementText}</div>
          </div>
          <div style="padding-top:16px;border-top:1px solid #e5e7eb;">
            <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Essays Completed</div>
            <div style="font-size:20px;font-weight:600;color:#111827;">${data.essaysCompleted}</div>
          </div>
        </div>
        
        <h2 style="margin:0 0 16px;font-size:18px;font-weight:600;color:#111827;">Subject Breakdown</h2>
        <table width="100%" style="border-collapse:collapse;margin-bottom:32px;">
          <thead>
            <tr style="background:#f9fafb;">
              <th style="padding:12px;text-align:left;font-size:14px;font-weight:600;color:#6b7280;">Subject</th>
              <th style="padding:12px;text-align:center;font-size:14px;font-weight:600;color:#6b7280;">Essays</th>
              <th style="padding:12px;text-align:center;font-size:14px;font-weight:600;color:#6b7280;">Avg Score</th>
            </tr>
          </thead>
          <tbody>
            ${subjectRows}
          </tbody>
        </table>
        
        ${
          data.improvement > 0
            ? `
        <div style="background:#ecfdf5;border:1px solid #10b981;border-radius:8px;padding:16px;margin-bottom:24px;">
          <div style="font-weight:600;color:#047857;margin-bottom:4px;">🎉 Great Progress!</div>
          <div style="font-size:14px;color:#065f46;">You've improved by ${data.improvement}% this week. Keep up the excellent work!</div>
        </div>
        `
            : data.improvement < 0
              ? `
        <div style="background:#fef2f2;border:1px solid #ef4444;border-radius:8px;padding:16px;margin-bottom:24px;">
          <div style="font-weight:600;color:#dc2626;margin-bottom:4px;">💪 Room for Improvement</div>
          <div style="font-size:14px;color:#991b1b;">Your score dipped this week. Review your feedback and focus on weak areas.</div>
        </div>
        `
              : ''
        }
        
        <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px;">
          <div style="font-weight:600;color:#111827;margin-bottom:8px;">💡 Tips for Next Week:</div>
          <ul style="margin:0;padding-left:20px;font-size:14px;color:#6b7280;line-height:20px;">
            <li>Focus on subjects with lower scores</li>
            <li>Review AI feedback from previous essays</li>
            <li>Practice IRAC structure consistently</li>
            <li>Cite more Irish case law for higher marks</li>
          </ul>
        </div>
        
        <a href="https://fe1madesimple.com/practice" style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Continue Practicing</a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, `Your Weekly AI Progress: ${data.lastWeekAverage}% Average`, html);
  }

  async sendMotivationalEmail(email: string, firstName: string, data: any) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keep Pushing Forward</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Keep Pushing Forward 💪</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#6b7280;">We noticed your AI essay scores stayed at <strong>${data.lastWeekAverage}%</strong> this week — the same as last week. Progress isn't always linear, and plateaus are a normal part of learning.</p>
        
        <div style="background:#eff6ff;border:1px solid #3b82f6;border-radius:8px;padding:24px;margin-bottom:24px;">
          <div style="font-weight:600;color:#1e40af;margin-bottom:12px;">🎯 Breaking Through Plateaus</div>
          <ul style="margin:0;padding-left:20px;font-size:14px;color:#1e3a8a;line-height:22px;">
            <li style="margin-bottom:8px;"><strong>Try a different subject</strong> — fresh material can reignite momentum</li>
            <li style="margin-bottom:8px;"><strong>Review past feedback</strong> — identify recurring mistakes</li>
            <li style="margin-bottom:8px;"><strong>Practice under exam conditions</strong> — use the simulation mode</li>
            <li><strong>Focus on structure</strong> — IRAC methodology is 25% of your grade</li>
          </ul>
        </div>
        
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Remember: consistency beats perfection. You completed <strong>${data.essaysCompleted} essays</strong> this week — that's dedication. Keep showing up, and the breakthrough will come.</p>
        
        <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px;">
          <div style="font-size:14px;font-style:italic;color:#6b7280;">"Success is the sum of small efforts repeated day in and day out."</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:4px;">— Robert Collier</div>
        </div>
        
        <a href="https://fe1madesimple.com/practice" style="display:inline-block;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Start Your Next Essay</a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Keep Pushing Forward - You havve Got This!', html);
  }

  async sendScheduleNotificationToSupport(userEmail: string, userName: string) {
    const supportEmails = ['victorajayidamilare@gmail.com'];

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Onboarding Call Request</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">New Onboarding Call Request 📞</h1>
        
        <div style="background:#f9fafb;border-radius:8px;padding:24px;margin-bottom:24px;">
          <div style="margin-bottom:16px;">
            <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Student Name</div>
            <div style="font-size:16px;font-weight:600;color:#111827;">${userName}</div>
          </div>
          <div style="margin-bottom:16px;">
            <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Student Email</div>
            <div style="font-size:16px;font-weight:600;color:#111827;">${userEmail}</div>
          </div>
          <div>
            <div style="font-size:14px;color:#6b7280;margin-bottom:4px;">Requested Date</div>
            <div style="font-size:16px;font-weight:600;color:#111827;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
        
        <p style="margin:0;font-size:14px;line-height:20px;color:#6b7280;">Please schedule a 15-minute onboarding call with this student within 24 hours.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    for (const email of supportEmails) {
      await this.send(email, `New Onboarding Call Request - ${userName}`, html);
    }
  }
}

export default new EmailService();
