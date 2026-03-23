export const controller = {
  get: {
    handler(request, h) {
      return h.view('home/index', {
        pageTitle: 'Import notification service'
      })
    }
  }
}
