#version 460 core
layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 tangent;
layout(location = 3) in vec2 texcoord;

out vec3 worldNormal;
out vec3 worldPos;
out vec3 T;
out vec3 B;
out vec2 uv;

uniform mat4 M;
uniform mat4 V;
uniform mat4 P;

void main()
{
	gl_Position = P * V * M * vec4(vertex, 1.0);
	worldPos = vec3(M * vec4(vertex, 1.0));
	worldNormal = mat3(transpose(inverse(M))) * normal;
	uv = texcoord;
	T = (M * vec4(tangent, 0.0)).xyz;
	B = normalize(cross(T, worldNormal));
}