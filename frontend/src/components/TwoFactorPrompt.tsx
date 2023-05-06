import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const TwoFactorPrompt = () => {
  const [twoFactorVerificationCode, setTwoFactorVerificationCode] =
    useState<string>("");
  const router = useRouter();

  const handleTwoFactorVerificationCode = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const text: string = event.target.value;

    if (text === "") {
      setTwoFactorVerificationCode("");
      return;
    }

    const reg = /^[0-9]{0,6}$/;
    if (reg.test(text)) {
      setTwoFactorVerificationCode(text);
    }
  };

  const handleTwoFactorVerificationCodeSubmit = () => {
    // if (userTwoFactor?.key === undefined) return;
    // axios
    //   .post(
    //     `http://localhost:3000/two-factor/${id}/verify-first-time-two-factor`,
    //     {
    //       twoFactorToken: twoFactorVerificationCode,
    //       twoFactorKey: userTwoFactor.key,
    //     },
    //   )
    //   .then(() => {
    //     toast.success(`Succesfully Created Two-Factor`, {
    //       position: "bottom-right",
    //     });
    //     console.log(`Succesfully Created Two-Factor`);
    //     setShowQRModal(false);
    //     setUserHasTwoFactor(true);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //     if (error.response.status === 400) {
    //       toast.error(`Wrong Two-factor token`, {
    //         position: "bottom-right",
    //       });
    //     }
    //     console.log(`Failed to craete Two-Factor`);
    //   });
    if (twoFactorVerificationCode.length < 6)
      return toast.error("Code is not 6 digits!");
    toast.success("Verified!");
    router.push("/");
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        background: "#22333B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          border: "3px solid #93032E",
          // height: "260px",
          maxWidth: "600px",
          width: "100%",
          padding: "40px 32px",
          color: "accent.contrastText",
          bgcolor: "primary.100",
          boxshadow: 2,
        }}
      >
        <Typography variant="h4">Two factor authentication</Typography>
        <Typography paddingTop={2}>
          Enter the 6-digit code from your two factor authenticator app.
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          value={twoFactorVerificationCode}
          sx={{
            marginTop: 6,
            width: "140px",
            borderRadius: "8px",
            backgroundColor: "primary.300",
            textAlign: "center",
          }}
          inputProps={{ style: { textAlign: "center" } }}
          onChange={handleTwoFactorVerificationCode}
        />
        <Button
          type="submit"
          size="large"
          color="secondary"
          variant="contained"
          sx={{
            color: "text.primary",
            // fontSize: "1em",
            // height: "40px",
            // fontWeight: "600",
            // backgroundColor: "accent.light",
            marginTop: "20px",
            // textTransform: "none",
            // width: "170px",
          }}
          onClick={handleTwoFactorVerificationCodeSubmit}
        >
          Verify
        </Button>
      </Box>
    </Container>
  );
};

export default TwoFactorPrompt;