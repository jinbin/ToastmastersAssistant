const automator = require('miniprogram-automator')

describe('index', () => {
  let miniProgram
  let page

  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: '/Users/jinbin/Code/tmUtils/'
    })
    page = await miniProgram.reLaunch('/pages/video/vcollection/vcollection')
    await page.waitFor(500)
  }, 30000)

  it('desc', async () => {
    const desc = await page.$('.index-desc')
    expect(desc.tagName).toBe('view')
    expect(await desc.text()).toContain('以下将展示小程序官方组件能力')
  })  

  afterAll(async () => {
    await miniProgram.close()
  })
})
