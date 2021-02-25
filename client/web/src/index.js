switch(process.env.REACT_APP_TYPE) {
  case 'redirect':
    import('./apps/redirect')
    break

  case 'about':
    import('./apps/about')
    break

  default:
    import('./apps/main')
    break
}
