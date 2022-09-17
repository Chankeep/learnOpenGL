# **learnOpenGL** :clown_face:
---
- 开始学习**openGL**啦，有了图形学和c++基础学起来还是轻松很多，慢慢加油吧！
---
## 进度
- [x] 入门章节
- [ ] 光照
    - [x] 颜色
    - [x] 基础光照
    - [x] 材质
    - [x] 光照贴图
    - [ ] 投光物
    - [ ] 多光源
- [ ] 模型加载
- [ ] 高级OpenGL
- [ ] 高级关照
    - [x] 法线贴图
- [ ] PBR
- [ ] 实战
## 更新部分
### update by chankkep on 2022/9/13
- 入门章节全部完成，包括练习
[复习链接](https://learnopengl-cn.github.io/01%20Getting%20started/10%20Review/)
- 对学习引擎还是很有帮助的 :smiley:

### update by chankkep on 2022/9/14
- 增加了camera类，封装视角移动还有摄像机属性代码，方便使用
- 完成到光照部分的基础光照，重现了phong光照模型

### update by chankkep on 2022/9/17
- 这几天休息了会，今天才踩完坑效果才正确
- 直接跳到法线贴图了，因为之前看shader精要的时候就从blinn-phong到法线贴图
- 接下来更新可能会很慢，因为决定去肝SRP了 :clown_face:
## 笔记部分
### 1. VBO、VAO、EBO（IBO）
  - 是什么？
      - 顶点缓冲对象(Vertex Buffer Object)： 一个调用显存并存储所有顶点数据供显卡使用的缓冲对象。
      - 顶点数组对象(Vertex Array Object)： 存储缓冲区和顶点属性状态。
      - 元素缓冲对象(Element Buffer Object，EBO)，也叫索引缓冲对象(Index Buffer Object，IBO)： 一个存储元素索引供索引化绘制使用的缓冲对象。
  - GLuint的值怎么变化？
      - 第几个使用glGenBuffers的int值就为几，三种对象分别计数
### 2. view矩阵推导
```C++
    glm::mat4 view = glm::mat4(1.0f);
    view = glm::lookAt(cameraPos, cameraPos + cameraFront, up);
    //第一个参数是相机位置，第二个是相机方向，是Pos+front他就是永远看向相机的前方， up是（0，1，0）
    lookAt计算过程
    glm::mat4 view = glm::mat4(1.0f);
    glm::mat4 viewRotate = glm::mat4(1.0f); // make sure to initialize matrix to identity matrix first
    glm::mat4 viewTranslate = glm::mat4(1.0f);
    glm::vec3 cameraDir = glm::normalize(center - eye);
    glm::vec3 cameraRight = glm::normalize(glm::cross(up, cameraDir));
    glm::vec3 cameraUp = glm::cross(cameraDir, cameraRight);
    viewRotate = glm::transpose(glm::mat4(glm::vec4(cameraRight, 0.0f), glm::vec4(cameraUp, 0.0f), glm::vec4(cameraDir, 0.0f), glm::vec4(0.0f, 0.0f, 0.0f, 1.0f)));
    viewTranslate = glm::transpose(glm::mat4(glm::vec4(1.0f, 0.0f, 0.0f, -eye.x), glm::vec4(0.0f, 1.0f, 0.0f, -eye.y), glm::vec4(0.0f, 0.0f, 1.0f, -eye.z), glm::vec4(glm::vec3(0.0f), 1.0f)));
    view = viewRotate * viewTranslate;
```
### 3.纹理 
 [网站](https://learnopengl-cn.github.io/01%20Getting%20started/06%20Textures/)
- 纹理环绕方式：
    - GL_REPEAT
    - GL_MIRRORED_REPEAT
    - GL_CLAMP_TO_EDGE
    - GL_CLAMP_TO_BORDED
    - 每个选项都可以使用glTexParameter*函数对单独的一个坐标轴设置（s、t（如果是使用3D纹理那么还有一个r）它们和x、y、z是等价的

              glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_MIRRORED_REPEAT);
              glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_MIRRORED_REPEAT);
- 纹理过滤方式：
    - GL_LINEAR
    - GL_NEAREST
### 4. 欧拉角推导
- 非常清晰明了
![File](https://uploads.disquscdn.com/images/6b3d3b11c2aa903864562b777a8531488ae4df63f5f022466c44f091e0eb1d44.jpg)
### 5. TBN矩阵推导
> 直接跳到法线贴图了因为之前感觉都比较简单，坑踩得不少

![图片](https://learnopengl-cn.github.io/img/05/04/normal_mapping_surface_edges.png)

- 看上面的图，只要给出三角形的三个点，就能计算出该三角形的TBN矩阵
$$
E_1=\Delta U_1T+\Delta V_1B
$$
$$
E_2=\Delta U_2T+\Delta V_2B
$$
- 由上述推导得知，三角形中任意一条边可以用T和B的线性组合来表示，使用线性代数的知识可以解出T和B，其实解出T就可以，因为B可以由T和N叉积得到，不过这里要注意坐标系，可以先把T和N转到世界空间再计算B
- 左手坐标系：
```c++
binormal = cross(T, N);
```
- 右手坐标系：
```c++
binormal = cross(N, T);
```
> 我就是因为看了评论区说是右手坐标系所以B一直是反的，艹

在顶点着色器下计算出TBN矩阵，在片元着色器里使用，如下（OpenGL是列优先矩阵，可以不用转置）
```glsl
//vert:
mat3 TBN = mat3(T,B,N);
//frag:
vec3 normal = texture(normalTex, uv).rgb;
normal.xy = normal.xy * 2.0 - 1.0;
normal.z = sqrt(1.0 - dot(normal.xy, normal.xy));
//使用即可
```