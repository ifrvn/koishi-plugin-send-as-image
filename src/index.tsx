import { Context, Element, Schema } from 'koishi'
import {} from 'koishi-plugin-puppeteer'

export const name = 'send-as-image'
export const using = ['puppeteer', 'logger'] as const

export interface Config {
  /** 触发转换的消息文本长度 */
  length: number
  /** 生成图片的宽度，单位px */
  width: number
}

export const Config: Schema<Config> = Schema.object({
  length: Schema.number().default(200).description('触发转换的消息文本长度，0则会将所有机器人发出的文本消息都转成图片'),
  width: Schema.number().default(350).description('生成图片的宽度，单位px（像素）。')
})

export function apply(ctx: Context, config: Config) {
  ctx.before('send', async (session) => {
    try {
      checkElements(session.elements!)
    } catch (error) {
      ctx.logger('send-as-image').debug(error)
      return
    }
    if (session.content.length > config.length) {
      session.content = await render(ctx, session.content, config.width)
    }
  }, true)
}

function checkElements (eles: Element[]) {
  eles.forEach(ele => {
    if (!['text', 'template', 'p'].includes(ele.type)) {
      throw new Error(`Found inconvertible element type: ${ele.type}, send message as origin.`)
    }
    if (ele.children.length > 0)
      checkElements(ele.children)
  })
}

async function render(ctx: Context, content: string, picWidth: number) {
  const html = `<html style="width: ${picWidth}px; height: 0; background: 'white'; word-wrap: break-word; white-space: pre-wrap;">
        <div>${content.replaceAll('\n', '<br>').replaceAll(/<\/*template>/g, '')}</div>
      </html>`
  return await ctx.puppeteer.render(html)
}
