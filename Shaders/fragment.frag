#version 460 core

out vec4 FragColor;
in vec3 worldPos;
in vec3 normal;

uniform vec3 lightPos;
uniform vec3 lightColor;
uniform vec3 objectColor;
uniform vec3 viewDir;

void main()
{
	vec3 norm = normalize(normal);
	vec3 lightDir = normalize(lightPos - worldPos);

	float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * lightColor;

	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuse = diff * lightColor;
	
	float Gloss = 128;
	vec3 viewDir = normalize(viewDir - worldPos);
	vec3 reflectDir = reflect(-lightDir, norm);

	float spec = pow(max(dot(viewDir, reflectDir), 0.0), Gloss);
	vec3 specular = spec * lightColor;

	vec3 result = (ambient + diffuse + specular) * objectColor;
	FragColor = vec4(result, 1.0) ;
}