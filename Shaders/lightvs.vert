#version 460 core
layout(location = 0) in vec3 vertex;
layout(location = 1) in vec2 texcoord;

out vec2 uv;

uniform mat4 M;
uniform mat4 V;
uniform mat4 P;

void main()
{
	gl_Position = P * V * M * vec4(vertex, 1.0);
}