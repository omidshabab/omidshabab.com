import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Html,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
  url: string;
}

export const VerifyEmail = ({ url }: VerifyEmailProps) => (
  <Html style={{ height: "100vh" }}>
    <Tailwind>
      <Head>
        <Font
          fontFamily="Bricolage Grotesque"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://db.onlinewebfonts.com/t/4e34bf694ce3b4ec7647f869699736a5.woff2",
            format: "woff2",
          }}
          fontWeight="bold"
          fontStyle="normal"
        />

        <Font
          fontFamily="Bricolage Grotesque"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://db.onlinewebfonts.com/t/a09d572467d9623f4643d8bd94af6036.woff2",
            format: "woff2",
          }}
          fontWeight="normal"
          fontStyle="normal"
        />
      </Head>

      <Body
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ea580c' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
        className="bg-orange-50">
        <Container
          className="flex w-full min-h-screen items-center justify-center px-[25px] sm:px-0 py-[50px]">
          <Text className="text-[30px] leading-[3rem] text-slate-800 sm:text-[40px] sm:leading-[4rem] font-bold">
            We&apos;re thrilled to have you on board. To get started, please confirm your email address by clicking the button below.
          </Text>

          <Container className="h-[20px] sm:h-[35px]" />

          <Button
            href={url}
            className="cursor-pointer rounded-[12px] bg-orange-600 px-[25px] py-[20px] text-[16px] font-bold text-white sm:rounded-[15px] sm:px-[30px] sm:py-[22px] sm:text-[22px]"
          >
            Verify your email and login!
          </Button>

          <Container className="h-[5px] sm:h-[10px]" />

          <Text className="text-[15px] leading-[1.5rem] text-slate-800 sm:text-[20px] sm:leading-[2rem] font-normal">
            This will verify your account and give you full access to all the amazing features of leitner box.
          </Text>

          <Text className="text-[15px] leading-[1.5rem] text-slate-800 sm:text-[20px] sm:leading-[2rem] font-normal">
            If you did not sign up for a omidshabab account, please ignore this email.
          </Text>

          <Text className="text-[15px] leading-[1.5rem] text-slate-800 sm:text-[20px] sm:leading-[2rem] font-normal">
            Thank you for choosing omidshabab to help you enhance your learning process. We&apos;re here to support you every step of the way!
          </Text>

          <Container className="h-[40px] sm:h-[50px]" />

          <Container className="bg-black/5 w-full h-[1px]" />

          <Text className="text-[13px] leading-[1.25rem] text-slate-800/50 sm:text-[16px] sm:leading-[2rem] font-normal">
            Need help? Visit our Support Center or contact us at omidshabab.com
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default VerifyEmail;
