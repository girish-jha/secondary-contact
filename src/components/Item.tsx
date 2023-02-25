import { Paper, styled, Theme } from "@mui/material";

export const Item = styled(Paper)(({ theme }: { theme: Theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));