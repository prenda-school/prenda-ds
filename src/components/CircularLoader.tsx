import { CircularProgress, styled } from "@mui/material"

export const CircularLoader = () => (
  <LoaderContainer>
    <CircularProgress />
  </LoaderContainer>
)

const LoaderContainer = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px;
`
