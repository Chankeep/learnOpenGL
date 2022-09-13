#version 460 core
layout(location = 0) in vec3 vertex;
layout(location = 1) in vec2 texcoord;

out vec2 uv;

uniform mat4 transform;

void main()
{
	
	gl_Position = transform * vec4(vertex, 1.0);
	uv = vec2(texcoord.x, 1- texcoord.y);
}