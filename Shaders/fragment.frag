#version 460 core

out vec4 FragColor;
in vec3 ourColor;
in vec2 uv;

uniform sampler2D TEXTURE1;
uniform sampler2D TEXTURE2;
uniform float mixValue;

void main()
{
	FragColor = mix(texture(TEXTURE1, vec2(-uv.x, uv.y)), texture(TEXTURE2, uv), mixValue);
}