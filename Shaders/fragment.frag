#version 460 core

out vec4 FragColor;
in vec3 ourColor;
in vec2 uv;

uniform sampler2D TEXTURE;

void main()
{
	FragColor = texture(TEXTURE, uv);
}