#version 460 core
layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 color;
layout(location = 2) in vec2 texcoord;

out vec3 ourColor;
out vec2 uv;

void main()
{
	
	gl_Position = vec4(vertex, 1.0);
	uv = texcoord;
}