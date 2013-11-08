my-grunt
========

git windows中文 乱码问题解决汇总

git的Windows版本Msysgit对中文的支持不够好 。
当使用时，会出现以下三种情况的中文乱码： 
下面的几个文件都在git安装目录下文件夹etc内。
1.ls不能显示中文目录 
解决办法：在git/git-completion.bash中增加一行： 
alias ls='ls --show-control-chars --color=auto' 


2.git commit不能提交中文注释 

（错误类似：

D:\versionControlGit\gitLearn>git commit -m "第一次提交README"
Warning: commit message does not conform to UTF-8.
You may want to amend it after fixing the message, or set the config
variable i18n.commitencoding to the encoding your project uses.

）


解决办法：修改git/inputrc中对应的行： 

set output-meta on 
set convert-meta off 

 


3.git log无法显示中文注释 
解决办法：在git/profile中增加一行： 

export LESSCHARSET=iso8859

上面的方法不是很好，一般推荐用utf-8编码。

在MsysGit中，使用git log显示提交的中文log乱码。
解决方案：
设置git gui的界面编码

git config --global gui.encoding utf-8
设置 commit log 提交时使用 utf-8 编码，可避免服务器上乱码，同时与linux上的提交保持一致！

git config --global i18n.commitencoding utf-8
使得在 $ git log 时将 utf-8 编码转换成 gbk 编码，解决Msys bash中git log 乱码。

git config --global i18n.logoutputencoding gbk
使得 git log 可以正常显示中文（配合i18n.logoutputencoding = gbk)，在 /etc/profile 中添加：

export LESSCHARSET=utf-8

参考：
原帖地址: http://topic.csdn.net/u/20110113/19/b0d5d506-4307-428b-a61d-7974aa66a2da.html
 
首先要说明的是：这里介绍的方法都是大部分是本人“悟”出来的，所以网上难有流传！
好方法不能自己私藏，否则就白忙乎这几天了，分享给有需要的朋友们。如果有转载，敬请注明来自*CSDN老邓*作品。
呵呵，给自己打广告，实在是无耻之极，权当无聊之时打字之用。
欢迎流传，为最优秀的分布式版本管理系统Git做宣传！！
 一篇帖子：
步骤：参考以前写的：http://www.cnblogs.com/youxin/p/3348197.html
1. 下载：http://loaden.googlecode.com/files/gitconfig.7z
2. 解压到：<MsysGit安装目录>/cmd/，例如：D:\Program Files\Git\cmd
3. 进入Bash，执行gitconfig
 
搞定什么了？
看看gitconfig的内容先：
Perl code
#!/bin/sh
 
# 全局提交用户名与邮箱
git config --global user.name "Yuchen Deng"
git config --global user.email 邮箱名@gmail.com
 
# 中文编码支持
echo "export LESSCHARSET=utf-8" > $HOME/.profile
git config --global gui.encoding utf-8
git config --global i18n.commitencoding utf-8 (这个是git commit -m "中文" 如果不是utf-8,则提示waring）
git config --global i18n.logoutputencoding gbk （日志log输出 gbk编码）
 
# 全局编辑器，提交时将COMMIT_EDITMSG编码转换成UTF-8可避免乱码
git config --global core.editor notepad2
 
# 差异工具配置
git config --global diff.external git-diff-wrapper.sh
git config --global diff.tool tortoise
git config --global difftool.tortoise.cmd 'TortoiseMerge -base:"$LOCAL" -theirs:"$REMOTE"'
git config --global difftool.prompt false
 
# 合并工具配置
git config --global merge.tool tortoise
git config --global mergetool.tortoise.cmd 'TortoiseMerge -base:"$BASE" -theirs:"$REMOTE" -mine:"$LOCAL" -merged:"$MERGED"'
git config --global mergetool.prompt false
 
# 别名设置
git config --global alias.dt difftool
git config --global alias.mt mergetool
 
# 取消 $ git gui 的中文界面，改用英文界面更易懂
if [ -f "/share/git-gui/lib/msgs/zh_cn.msg" ]; then
rm /share/git-gui/lib/msgs/zh_cn.msg
fi
 
 
这个脚本解决了：
1. 中文乱码
2. 图形化Diff/Merge
3. 还原英文界面，更好懂
其中最有价值的，就是Git的Diff/Merge外部工具TortoiseMerge配置。
安装MsysGit后，一个命令即可完成配置。
适用于MsysGit安装版与绿色版。
 
网上关于为Git配置TortoiseMerge来进行diff和merge的介绍几乎没有（反正我没有搜索到），但我认为TortoiseMerge是最好用的，单文件（一个可执行程序，绿色版，下载地址：http://sourceforge.net/projects/tortoisesvn/files/Tools/1.6.7/TortoiseDiff-1.6.7.zip/download)，实在是绝配！
 
为什么不使用TortoiseGit？他们不是集成了TortoiseMerge吗？
理由：TortoiseGit只有Windows才有，我更喜欢git gui，结合gitk，跨平台实在相同的操作方式，更爽！
如果您离不开TortoiseGit，这篇文章就直接无视吧。
）
另一篇：
安装

设置（以下需要修改的文件，均位于 git 安装目录下的 etc/ 目录中）

2.1. 让 Git 支持 utf-8 编码

在命令行下输入以下命令：

$ git config --global core.quotepath false          # 显示 status 编码
$ git config --global gui.encoding utf-8            # 图形界面编码
$ git config --global i18n.commit.encoding utf-8    # 提交信息编码
$ git config --global i18n.logoutputencoding utf-8  # 输出 log 编码
$ export LESSCHARSET=utf-8
# 最后一条命令是因为 git log 默认使用 less 分页，所以需要 bash 对 less 命令进行 utf-8 编码
2.2. 让 ls 命令可以显示中文名称

修改 git-completion.bash 文件：

# 在文件末尾处添加一行
alias ls="ls --show-control-chars --color"
经过以上折腾之后，基本可以解决中文显示的问题。唯一的麻烦在于输入中文字符时会显示乱码，目前还没有完美的解决方案。

以下描述一个可用的临时方案：

前提条件：git commit 时，不用 -m 参数，也就是不在命令行下直接输入提交信息，而是敲回车，让 vim 来接管

进入 vim 后，按 i 键进入编辑模式，然后输入提交信息。（可多行）

输入完成后按 esc 退出编辑模式，然后输入 :wq，也就是写入+退出，即可。

如果进入 vim 后发现不能输入中文，那么先按 esc 退出编辑模式，然后输入：:set termencoding=GBK，即可。（也可能是 GB2312，都试一下）

还好我们有 GUI

实在搞不定命令行的童鞋，请直接使用各种 GUI 工具吧！

使用 eclipse IDE的，可以安装 EGit 插件

不使用 IDE 的，可以搜索一个叫做 SmartGit 的 GUI 客户端

That's All!

我试过上面的vim输入，还是乱码。

经过多次使用，github只能支持utf-8格式的文件，我们在git 用touch创建的格式是ansi格式，上面上去会乱码：

类似下面的：

µÚÒ»ÐÐÖÐÎÄ
Englist
。
所有我们文件格式要是utf-8的。
现在只解决了文件内容不乱码问题（设置为utf-8）。
