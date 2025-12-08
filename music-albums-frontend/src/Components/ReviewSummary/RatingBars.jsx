import { Box, LinearProgress, Typography } from "@mui/material";

export default function RatingBars({ stats }) {
  // example stats: { 5: 12, 4: 7, 3: 3, 2: 1, 1: 0 }
  const max = Math.max(...Object.values(stats));

  return (
    <Box
      sx={{ width: "300px", display: "flex", flexDirection: "column", gap: 1 }}
    >
      {[5, 4, 3, 2, 1].map((rating) => {
        const value = stats[rating] || 0;
        const percent = max > 0 ? (value / max) * 100 : 0;

        return (
          <Box
            key={rating}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Typography sx={{ width: 16, color: "black" }}>{rating}</Typography>

            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{
                flexGrow: 1,
                height: 8,
                borderRadius: 5,
                backgroundColor: "#eee",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  backgroundColor: "#f5b041", // orange like your mockup
                },
              }}
            />

            <Typography sx={{ width: 30, textAlign: "right", color: "gray" }}>
              {value}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
