import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default function useBreakpoints() {
  const theme = useTheme()
  const query = theme.breakpoints.up('desktop')
  const isDesktop = useMediaQuery(query, { noSsr: true })
  return {
    isDesktop,
    isMobile: !isDesktop,
  }
}
