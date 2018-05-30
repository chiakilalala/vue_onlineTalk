
const app = new Vue({
  el: '#app',
  data: {
    data: [],
    locations: [],
    currentPage: 0,
    currentLocation: '',
    pages: 0,
  },
  methods: {
    updatePage(page) {
      this.currentPage = page
    },
    getUniqueList() {
      const locations = new Set();
      this.data.forEach((item, i) => {
        locations.add(item.Zone)
      })
      this.locations = Array.from(locations);
    }
  },
  computed: {
    filterData() {
      const newData = []
      const vm = this
      let items = []
      if (vm.currentLocation !== '') {
        items = vm.data.filter((item, i) => {
          return item.Zone === vm.currentLocation
        })
      } else {
        items = vm.data
      }
      
      items.forEach((item, i) => {
        if (i % 10 === 0) {
          newData.push([])
        }
        const page = parseInt(i / 10)
        console.log(i, page)
        newData[page].push(item)
      })
      vm.pages = newData.length // 分頁數量
      vm.currentPage = 0
      return newData
    },
  },
  created () {
    const vm = this
    axios.get('http://localhost:5000/data').then((response) => {
      console.log(response)
      vm.data = response.data
      vm.getUniqueList()
    })
  }
})