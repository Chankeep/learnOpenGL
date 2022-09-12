#version 460 core
layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 color;

out vec3 ourColor;
uniform float offset;

void main()
{
	
	gl_Position = vec4(vertex.x, vertex.y, vertex.z, 1.0);
	ourColor = vertex;
}