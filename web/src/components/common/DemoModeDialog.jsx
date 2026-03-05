import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
} from "@material-ui/core";
import config from "config";

const DEMO_MODE_SEEN_KEY = "f1-pickem-demo-mode-seen";

export default function DemoModeDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Only show in demo mode
    if (!config.isDemoMode) {
      return;
    }

    // Check if user has already seen the dialog
    const hasSeenDialog = localStorage.getItem(DEMO_MODE_SEEN_KEY);
    if (!hasSeenDialog) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    // Mark as seen in localStorage
    localStorage.setItem(DEMO_MODE_SEEN_KEY, "true");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: { borderRadius: 8 }
      }}
    >
      <DialogTitle style={{ paddingBottom: "0.5em" }}>
        <Typography variant="h5" style={{ fontWeight: 600, fontStyle: "italic", letterSpacing: '-0.5px' }}>
          Welcome to F1 Pick 'Em
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent style={{ paddingTop: "1.5em", paddingBottom: "1.5em" }}>
        <Typography variant="body1" paragraph style={{ lineHeight: 1.7 }}>
          Compete with friends by predicting the top 10 finishers for each Formula 1 race.
        </Typography>
        <Typography variant="body1" paragraph style={{ lineHeight: 1.7, marginBottom: "2em" }}>
          You're viewing a demo with sample data from the 2024 season. Explore leagues, view race results, and see how scoring works.
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ fontStyle: "italic" }}>
          Note: Changes are not saved in demo mode.
        </Typography>
      </DialogContent>
      <DialogActions style={{ padding: "1em 1.5em", justifyContent: "center" }}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          size="large"
          style={{ minWidth: "150px" }}
        >
          Get Started
        </Button>
      </DialogActions>
    </Dialog>
  );
}