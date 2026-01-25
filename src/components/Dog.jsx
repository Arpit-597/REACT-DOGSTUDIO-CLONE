import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { DirectionalLight, Scene } from "three";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Dog = ({ theme }) => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  // model component mai aaya h
  const model = useGLTF("./models/dog.drc.glb");

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.55;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  // Use animation takes 2 things , model animation which we got in our model attached and the whole scene
  // and it returns an actions object which we can apply or activate
  const { actions } = useAnimations(model.animations, model.scene);
  // console.log(actions)
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  // All the details will be stored in this
  // const textures = useTexture({
  //     normalMap: "/dog_normals.jpg",
  //     sampleMapCat: "/matcap/mat-2.png"
  // })

  // textures.normalMap.flipY = false
  // textures.sampleMapCat.colorSpace = THREE.SRGBColorSpace

  // Here the previous redundant work is reduced and this is clean code and same as above only
  const [normalMap, diffuseMap, specularMap] = useTexture([
    "./dog_normals.jpg",
    "./dog_diffuse.jpg",
    "./dog_specular.jpg",
  ]);

  normalMap.flipY = false;
  diffuseMap.flipY = false;
  specularMap.flipY = false;

  normalMap.colorSpace = THREE.NoColorSpace;
  diffuseMap.colorSpace = THREE.SRGBColorSpace;
  specularMap.colorSpace = THREE.NoColorSpace;

  const [branchdiffuseMap, branchNormalMap] = useTexture([
    "./branches_diffuse.jpeg",
    "./branches_normals.jpeg",
  ]);

  branchdiffuseMap.colorSpace = THREE.SRGBColorSpace;
  branchNormalMap.colorSpace = THREE.NoColorSpace;
  branchNormalMap.flipY = false;

  const [mat2, mat8, mat9, mat10, mat11, mat12, mat13, mat19] = useTexture([
    "/matcap/mat-2.png",
    "/matcap/mat-8.png",
    "/matcap/mat-9.png",
    "/matcap/mat-10.png",
    "/matcap/mat-11.png",
    "/matcap/mat-12.png",
    "/matcap/mat-13.png",
    "/matcap/mat-19.png",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  // So this applies on onBeforeCompile and this do:
  // like for 0.2 uProgress , uMatcap2 will take 20% of the total material
  const material = useRef({
    uMatcap1: { value: mat2 },
    uMatcap2: { value: mat2 },
    uProgress: { value: 1.0 },
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: mat2,
    normalScale: new THREE.Vector2(1.2, 1.2),
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    matcap: mat2,
    normalMap: branchNormalMap,
    normalScale: new THREE.Vector2(10, 10),
  });

  const eyematcap = useTexture("./matcap/mat-1.png");
  eyematcap.colorSpace = THREE.SRGBColorSpace;

  const eyeMaterial = new THREE.MeshMatcapMaterial({
    // specularMap: specularMap,
    // diffuseMap: diffuseMap,
    normalMap: normalMap,
    matcap: eyematcap,
    // color: 0x000000
  });

  //  So GLSL interacts with GPU and give us a object with computed values of how it would look like
  // Ḷike in a browser if it is 60fps then it will do computation for each frame means 60 frame per sec
  // and the vertex shader and fragment shader we talked about will run for all the objects once in our threejs
  // and then give us colors , materials , shape etc.
  // means the shaders will run for each frame
  function onBeforeCompile(shader) {
    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
    shader.uniforms.uProgress = material.current.uProgress;

    // Store reference to shader uniforms for GSAP animation
    // node_modules -> three -> renderers -> shader -> meshmatcap
    // In that we can see that fragment shader has a string so we replace void main() { with the below one,
    //  NOT REPLACED THE FUNCTION , JUST THAT STRING PART
    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
            uniform sampler2D uMatcapTexture1;
            uniform sampler2D uMatcapTexture2;
            uniform float uProgress;

            void main() {
            `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      // Final matcap color which will be applied on material
      // transitionFactor mtlb kitna merge hoga
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
            vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
            vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
            float transitionFactor = 0.01;

            float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x + vViewPosition.y)*0.5 + 0.5);

            vec4 matcapColor = mix(matcapColor2, matcapColor1, progress);
            `,
    );
  }

  // So onBeforeCompile means that the vertex and fragment shader code we talked about
  // we know that will run on each frame
  // so with this onBeforeCompile , before each frame runs we can change/edit the vertex and fragment shader code
  dogMaterial.onBeforeCompile = onBeforeCompile;
  branchMaterial.onBeforeCompile = onBeforeCompile;

  // This will select every element each once , so total of 108 elements (objects)
  model.scene.traverse((child) => {
    // Every child has a name here , and we will use it to check whether it has DOG name in it or not
    if (child.isMesh && child.name.includes("DOG")) {
      // console.log(child.name)
      // Now child ke material pe upar waala normalMap lagana hai
      // MeshBasicMaterial is a type of material which doesnt interact with light any all
      // Sometimes normalMap does not fit properly, so we flip them along Y-axis
      child.material = dogMaterial;
      // sampleMapCat.flipY = false
      if (child.name.includes("eye")) {
        child.material = eyeMaterial;
      }
    } else {
      child.material = branchMaterial;
    }
  });

  const dogModel = useRef(model);

  useGSAP(() => {
    const tl = gsap.timeline(
      {
        scrollTrigger: {
          trigger: "#section-1",
          endTrigger: "#section-5",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      },
      [],
    );

    tl.to(dogModel.current.scene.position, {
      z: "-=0.75",
      y: "+=0.1",
    })
      .to(dogModel.current.scene.rotation, {
        //  ThreeJS takes all values of rotation in PI
        // One PI is equal to 180 degree
        x: `+=${Math.PI / 15}`,
      })
      .to(
        dogModel.current.scene.rotation,
        {
          y: `-=${Math.PI}`,
          x: `+=${Math.PI / 10}`,
        },
        "third",
      ) // "third" works as a tag , so 3rd .to and fourth .to happens at same time
      .to(
        dogModel.current.scene.position,
        {
          x: "-=0.4",
          z: "+=0.4",
          y: "+=0.025",
        },
        "third",
      );
  });

  useEffect(() => {
    document
      .querySelector(`.title[img-title="tomorrowland"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat19;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.5,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[img-title="navy-pier"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat8;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.5,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[img-title="msi-chicago"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat9;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.5,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[img-title="phone"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat12;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[img-title="kikk"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat10;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.5,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[img-title="kennedy"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat11;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.5,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document
      .querySelector(`.title[img-title="opera"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat13;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.5,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });
    document.querySelector(`.titles`).addEventListener("mouseleave", () => {
      material.current.uMatcap1.value = mat2;

      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 0.5,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    });
  }, []);

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.19, -0.625, 0.17]}
        rotation={[0, Math.PI / 3.97, 0]}
      />
      <ambientLight intensity={theme === "dark" ? 0.5 : 1.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={theme === "dark" ? 0.8 : 2}
      />
      <directionalLight
        position={[0, 5, 5]}
        color={0xffffff}
        intensity={theme === "dark" ? 10 : 5}
      />
    </>
  );
};

export default Dog;
