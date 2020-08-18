import AppUtils from "../util/AppUtils"

class NewsApi {
    appApi = new AppUtils()
    constructor(params) {
        // this.appApi.baseUrl = 'http://localhost:4000/api'
        this.appApi.baseUrl = 'http://54.169.227.141:4000/api'
    }

    async loadFeed() {
            return  await this.appApi.loadApi('/news').then (res => {
                if(!res.title) res.title = "Bài viết không có tiêu đề"
                if(!res.summary) res.summary = "Nhấn để xem nội dung"
            })
        }

    async loadFeedDetail(feedId) {
        return await this.appApi.loadApi('/news/content/'+ feedId)
    }
}

export default NewsApi