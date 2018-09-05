#### less中单位说明
使用rem为单位，设计稿尺寸宽750，单位转换为1rem = 32px；
就是`设计稿中量的尺寸/32*1rem`就是代码中的尺寸值；太小的单位不宜使用rem作为单位

```
@rootFont: 32;
.px2rem(@name , @px) {
    @{name}: (@px/32) * 1rem;
}
```
`.px2rem()`函数适用于单个值，比如`.px2rem(padding-left, 24);`为设置的padding-left，解析后是`padding-left: 0.75rem;`
以上定义的变量`@rootFont`为根元素的font-size值，不加单位是为了直接计算方便，比如`padding: 30/@rootFont*1rem;`，
这样就可以同时设置几个值