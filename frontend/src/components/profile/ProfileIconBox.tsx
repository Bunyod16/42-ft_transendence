import { UserProfile } from "@/types/user-profile-type";
import { Box, Avatar, Typography } from "@mui/material";
import { useEffect } from "react";

export default function ProfileIconBox(user: UserProfile) {
  useEffect(() => {
    console.log(`Profile Page of in iconbox:${user.nickName}`);
  }, [user]);

  /*
   * Wins worth 2 points
   * Losses worth 1 point
   *
   * expIncreasePerLevel means
   * level 1 -> 2 points
   * level 2 -> 4 points
   * level 3 -> 6 points
   * ...
   *
   * extra points left gets turned into fraction over next level.
   * */

  function calculateUserLevel(wins: number, losses: number): string {
    let totalPoints: number = wins * 2 + losses;
    let finalLevel = 0.0;
    let expIncreasePerLevel = 2;

    while (totalPoints > 0) {
      totalPoints -= expIncreasePerLevel;
      expIncreasePerLevel++;
      finalLevel++;
    }

    //calculate float if theres extra exp
    if (totalPoints !== 0) {
      finalLevel +=
        (totalPoints + (expIncreasePerLevel - 1)) / expIncreasePerLevel;
    }

    //round to 3dp
    return finalLevel.toFixed(3);
  }

  function calculateUserMMR(wins: number, losses: number): number {
    const mmr = wins - losses > 0 ? (wins - losses) * 25 : 0;
    return mmr;
  }

  return (
    <Box
      component="div"
      sx={{ padding: "10px 50px", backgroundColor: "primary.100" }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "text.secondary",
          fontSize: "1.5em",
          fontWeight: "500",
          marginBottom: "10px",
          textTransform: "uppercase",
        }}
      >
        PLAYER PROFILE
      </Typography>
      <Box component="div" sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar
          sx={{ width: "120px", height: "120px", borderRadius: "8px" }}
          src="/jakoh_smol.jpg"
        ></Avatar>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: "20px",
            padding: "0px",
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: "3em",
              fontWeight: "800",
              margin: "0px",
              lineHeight: "0.8em",
              color: "text.primary",
              textTransform: "uppercase",
            }}
          >
            {user.nickName}
          </Typography>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: "50px",
                backgroundColor: "primary.200",
                borderRadius: "8px",
                padding: "5px 5px",
                width: "150px",
                fontWeight: "700",
                fontSize: "1.5em",
                margin: "0px",
              }}
            >
              Lvl {calculateUserLevel(user.wins, user.losses)}
            </Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: "50px",
                backgroundColor: "primary.200",
                borderRadius: "8px",
                padding: "5px 5px",
                width: "150px",
                fontWeight: "700",
                fontSize: "1.5em",
                margin: "0px",
              }}
            >
              {calculateUserMMR(user.wins, user.losses)} MMR
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}