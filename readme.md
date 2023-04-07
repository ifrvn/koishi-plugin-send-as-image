# koishi-plugin-send-as-image

[![npm](https://img.shields.io/npm/v/koishi-plugin-send-as-image?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-send-as-image)

将机器人的文字消息转成图片再发出，避免单条消息太长触发风控

只转换纯文本消息，不影响含有其他内容的消息（如@、回复、合并转发等）

对于Koishi内置的[消息组件](https://koishi.chat/guide/basic/element.html#%E6%B6%88%E6%81%AF%E7%BB%84%E4%BB%B6)，支持了`<random>`，其他的依赖于Koishi的内部实现，不会进行转换（所以如果看到符合转换条件的消息没有变成图片，可能是由于相关插件使用了消息组件，无法进行转换）

依赖[puppeteer](https://puppeteer.koishi.chat/)插件

若字符无法正常显示，请先在系统中安装相应语言的字体

如有其他需求或问题反馈可前往[Koishi论坛](https://forum.koishi.xyz/)讨论，或者提交issue
