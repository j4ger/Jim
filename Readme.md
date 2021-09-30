# Jim —— 对 Tim 的拙劣模仿

首先是本家效果图

![Tim](./misc/tim.png)

## Roadmap

### 基础功能（静态）

1. 顶栏-底栏三按钮布局
   - Tailwind CSS
   - Vue component is 实现 tab 的切换
   - xicons
2. 对话、联系人、我的
3. 对话 ListItem 组件
4. 基础 state
   - vuex？（大概还是有必要吧）
   - 对话列表
     - 好友对象
       - 昵称
       - 头像
     - 消息列表
       - 最新消息
       - 所有消息（lazy）
   - 好友列表
     - 好友对象
     - 分组
   - 个人信息

### 基础功能（交互）

1. tab 切换的 transitions

   - vue `<transition>`

2. 聊天页面静态功能

   - message 组件
   - 头像
     - 内容
       - 文本
       - 图片
       - 混合
   - message 对象
     - 内容 Array
       - 类型
         - 图片
         - 文本
       - 内容（文本/Url）
     - 时间
     - 发送人
     - 接收人
   - 发送框
   - 发送图片？
   - 发送消息 transitions

3. 联系人分组+排序
4. 消息显示排序
5. 消息置顶
   - 长按选项
     - 置顶/取消置顶
     - 删除（从消息列表中？还是只是隐藏？~~完全仿制的话就是隐藏~~ ）
6. 自动换行（？）
