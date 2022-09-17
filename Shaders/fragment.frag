#version 460 core

out vec4 FragColor;
in vec3 worldPos;
in vec3 worldNormal;
in vec3 T;
in vec3 B;
in vec2 uv;

uniform vec3 lightPos;
uniform vec3 lightColor;
uniform vec3 objectColor;
uniform vec3 viewPos;
uniform sampler2D texture1;
uniform sampler2D texture2;

void main()
{
	vec3 N = normalize(worldNormal);
	mat3 TBN = mat3(T, B, N);
	vec3 normal = texture(texture2, uv).rgb;
	normal = normalize((normal * 2.0) - 1.0);
	normal.z = sqrt(1.0-dot(normal.xy, normal.xy));
	normal = normalize(TBN * normal);

	vec3 albedo = texture(texture1, uv).rgb;
	vec3 lightDir = normalize(lightPos - worldPos);
	vec3 viewDir = normalize(viewPos - worldPos);
	vec3 halfDir = normalize(viewDir + lightDir);

	vec3 diffuse = lightColor * albedo * max(0, dot(normal, lightDir));
	vec3 ambient = lightColor * albedo * 0.2;
	vec3 specular = lightColor * albedo * pow(max(0, dot(normal, halfDir)), 128) * 0.5;

	vec3 result = (diffuse + specular);
	FragColor = vec4(result, 1.0);
}