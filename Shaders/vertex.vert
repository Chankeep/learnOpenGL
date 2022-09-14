#version 460 core
layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 aNormal;

out vec3 normal;
out vec3 worldPos;
uniform mat4 M;
uniform mat4 V;
uniform mat4 P;

void main()
{
	gl_Position = P * V * M * vec4(vertex, 1.0);
	worldPos = vec3(M * vec4(vertex, 1.0));
	normal = mat3(transpose(inverse(M))) * aNormal;
}