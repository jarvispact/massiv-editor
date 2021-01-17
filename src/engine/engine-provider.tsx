import { createMap, createObjFileParser, Entity, FileLoader, ImageLoader, MouseInput, World } from 'massiv-3d';
import React, { useContext, useEffect, useState } from 'react';
import SimplexNoise from 'simplex-noise';
import { PerspectiveCamera } from './components/perspective-camera';
import { createRenderSystem } from './systems/render-system';
import { useTheme } from 'massiv-design-system';
import { Theme } from '../themes';
import { Transform } from './components/transform';
import { createOrbitCameraSystem } from './systems/orbit-camera-system';
import { Renderable } from './components/renderable';
import { createMouseRayPickingSystem } from './systems/mouse-ray-picking-system';
import { BoundingBox } from './components/bounding-box';

type Ctx = {
    world: World;
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    setWorld: React.Dispatch<React.SetStateAction<World>>;
    setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement>>;
    setGL: React.Dispatch<React.SetStateAction<WebGL2RenderingContext>>;
};

export const EngineContext = React.createContext<Ctx>({
    world: (null as any) as World,
    canvas: (null as any) as HTMLCanvasElement,
    gl: (null as any) as WebGL2RenderingContext,
    setWorld: () => {},
    setCanvas: () => {},
    setGL: () => {},
});

type Props = {
    world: World;
    children: React.ReactNode;
};

const colorMapper = createMap(0, 255, 0, 1);
const parseObjFile = createObjFileParser({ flipUvY: true });

const initEngine = async (world: World, canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) => {
    const [colorRaster, [groundGrass], [tree1Large], [tree1Medium], [tree1Small]] = await Promise.all([
        ImageLoader.load('./assets/color_raster.png'),
        FileLoader.load('./assets/ground_grass.obj').then(parseObjFile),
        FileLoader.load('./assets/tree_variant_1_large.obj').then(parseObjFile),
        FileLoader.load('./assets/tree_variant_1_medium.obj').then(parseObjFile),
        FileLoader.load('./assets/tree_variant_1_small.obj').then(parseObjFile),
    ]);

    const [[tree2Large], [tree2Medium], [tree2Small], [tree3Large], [tree3Medium], [tree3Small]] = await Promise.all([
        FileLoader.load('./assets/tree_variant_2_large.obj').then(parseObjFile),
        FileLoader.load('./assets/tree_variant_2_medium.obj').then(parseObjFile),
        FileLoader.load('./assets/tree_variant_2_small.obj').then(parseObjFile),
        FileLoader.load('./assets/tree_variant_3_large.obj').then(parseObjFile),
        FileLoader.load('./assets/tree_variant_3_medium.obj').then(parseObjFile),
        FileLoader.load('./assets/tree_variant_3_small.obj').then(parseObjFile),
    ]);

    gl.clearColor(colorMapper(45), colorMapper(55), colorMapper(72), 1); // initial dark theme color: [45, 55, 72]

    const mouseInput = new MouseInput(canvas);
    world.addSystem(createOrbitCameraSystem({ mouseInput, world }));
    // world.addSystem(createMouseRayPickingSystem({ mouseInput, world, canvas }));
    world.addSystem(createRenderSystem({ world, canvas, gl, colorRaster }));

    const camera = new PerspectiveCamera({ translation: [0, 15, 50], aspect: canvas.width / canvas.height }).lookAt([0, 0, 0]);
    world.addEntity(new Entity('DefaultCamera', [camera]));

    const worldTileSize = { x: 60, z: 60 };
    const worldHalfTileFactor = { x: worldTileSize.x / 2 - 0.5, z: worldTileSize.z / 2 - 0.5 };

    for (let x = 0; x < worldTileSize.x; x++) {
        for (let z = 0; z < worldTileSize.z; z++) {
            world.addEntity(
                new Entity(`GrassGroundTile-${x}-${z}`, [
                    new Transform({ translation: [x - worldHalfTileFactor.x, 0, z - worldHalfTileFactor.z] }),
                    new Renderable(groundGrass),
                    BoundingBox.fromPositions(groundGrass.positions, [x - worldHalfTileFactor.x, 0, z - worldHalfTileFactor.z]),
                ]),
            );
        }
    }

    const rand = () => Math.random() * 0.5;

    // const simplex = new SimplexNoise('dersamen');
    // const mapX = createMap(-worldHalfTileFactor.x, worldHalfTileFactor.x, 0, 1);
    // const mapZ = createMap(-worldHalfTileFactor.z, worldHalfTileFactor.z, 0, 1);
    // for (let x = 0; x < worldTileSize.x; x++) {
    //     for (let z = 0; z < worldTileSize.z; z++) {
    //         const xx = mapX(x - worldHalfTileFactor.x);
    //         const zz = mapZ(z - worldHalfTileFactor.z);
    //         const val = simplex.noise2D(xx, zz);
    //         if (val > 0.2) {
    //             world.addEntity(
    //                 new Entity(`TreeThinDark-${x}-${z}`, [
    //                     new Transform({ translation: [x - worldHalfTileFactor.x - 0.5 - rand(), 0, z - worldHalfTileFactor.z - 0.5 - rand()] }),
    //                     new Renderable(tree1Large),
    //                 ]),
    //             );
    //         }
    //     }
    // }

    // const simplex = new SimplexNoise('dersamen');
    // const simplex2 = new SimplexNoise('nocheinsamen');
    // const mapX = createMap(-worldHalfTileFactor.x, worldHalfTileFactor.x, 0, 1);
    // const mapZ = createMap(-worldHalfTileFactor.z, worldHalfTileFactor.z, 0, 1);
    // const mapSamen = createMap(-1, 1, 0, 1);
    // for (let x = 0; x < worldTileSize.x; x++) {
    //     for (let z = 0; z < worldTileSize.z; z++) {
    //         const xx = mapX(x - worldHalfTileFactor.x);
    //         const zz = mapZ(z - worldHalfTileFactor.z);
    //         const val = simplex.noise2D(xx, zz);
    //         if (val > 0.2) {
    //             const treeVariant = simplex2.noise2D(mapSamen(val), mapSamen(val));
    //             console.log(treeVariant);
    //             let renderable = new Renderable(tree1Large);

    //             if (treeVariant > -0.8) {
    //                 renderable = new Renderable(tree2Large);
    //             } else if (treeVariant > -0.2) {
    //                 renderable = new Renderable(tree3Large);
    //             }

    //             world.addEntity(
    //                 new Entity(`Tree-${x}-${z}`, [
    //                     new Transform({ translation: [x - worldHalfTileFactor.x - 0.5 - rand(), 0, z - worldHalfTileFactor.z - 0.5 - rand()] }),
    //                     renderable,
    //                 ]),
    //             );
    //         }
    //     }
    // }

    // const simplex = new SimplexNoise('dersamen');
    // const mapX = createMap(-worldHalfTileFactor.x, worldHalfTileFactor.x, 0, 1);
    // const mapZ = createMap(-worldHalfTileFactor.z, worldHalfTileFactor.z, 0, 1);
    // for (let x = 0; x < worldTileSize.x; x++) {
    //     for (let z = 0; z < worldTileSize.z; z++) {
    //         const xx = mapX(x - worldHalfTileFactor.x);
    //         const zz = mapZ(z - worldHalfTileFactor.z);
    //         const val = simplex.noise2D(xx, zz);
    //         if (val > 0.2) {
    //             const r = Math.random();
    //             let renderable = new Renderable(tree1Large);
    //             if (r > 0.3) {
    //                 renderable = new Renderable(tree2Large);
    //             } else if (r > 0.6) {
    //                 renderable = new Renderable(tree3Large);
    //             }
    //             world.addEntity(
    //                 new Entity(`TreeThinDark-${x}-${z}`, [
    //                     new Transform({ translation: [x - worldHalfTileFactor.x - 0.5 - rand(), 0, z - worldHalfTileFactor.z - 0.5 - rand()] }),
    //                     renderable,
    //                 ]),
    //             );
    //         }
    //     }
    // }

    const tree1 = [tree1Large, tree1Medium, tree1Small];
    const tree2 = [tree2Large, tree2Medium, tree2Small];
    const tree3 = [tree3Large, tree3Medium, tree3Small];
    const ri = () => Math.round(Math.random() * 2);

    const simplex = new SimplexNoise('dersamen');
    const mapX = createMap(-worldHalfTileFactor.x, worldHalfTileFactor.x, 0, 1);
    const mapZ = createMap(-worldHalfTileFactor.z, worldHalfTileFactor.z, 0, 1);
    for (let x = 0; x < worldTileSize.x; x++) {
        for (let z = 0; z < worldTileSize.z; z++) {
            const xx = mapX(x - worldHalfTileFactor.x);
            const zz = mapZ(z - worldHalfTileFactor.z);
            const val = simplex.noise2D(xx, zz);
            if (val > 0.2) {
                const r = Math.random();
                let renderable = new Renderable(tree1[ri()]);
                if (r > 0.3) {
                    renderable = new Renderable(tree2[ri()]);
                } else if (r > 0.6) {
                    renderable = new Renderable(tree3[ri()]);
                }
                world.addEntity(
                    new Entity(`TreeThinDark-${x}-${z}`, [
                        new Transform({ translation: [x - worldHalfTileFactor.x - 0.5 - rand(), 0, z - worldHalfTileFactor.z - 0.5 - rand()] }),
                        renderable,
                    ]),
                );
            }
        }
    }

    const tick = (time: number) => {
        world.update(time);
        window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
};

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

export const EngineProvider = ({ world, children }: Props) => {
    const [_world, setWorld] = useState<World>(world);
    const [canvas, setCanvas] = useState<HTMLCanvasElement>((null as any) as HTMLCanvasElement);
    const [gl, setGL] = useState<WebGL2RenderingContext>((null as any) as WebGL2RenderingContext);
    const { theme } = useTheme<Theme>();

    useEffect(() => {
        const appBG = hexToRgb(theme.color.appBackground);
        if (gl && appBG) gl.clearColor(colorMapper(appBG[0]), colorMapper(appBG[1]), colorMapper(appBG[2]), 1);
    }, [theme]);

    useEffect(() => {
        if (world && canvas && gl) initEngine(world, canvas, gl);
    }, [canvas, gl]);

    const context: Ctx = {
        world: _world,
        canvas,
        gl,
        setWorld,
        setCanvas,
        setGL,
    };

    return <EngineContext.Provider value={context}>{children}</EngineContext.Provider>;
};

export const useEngine = () => useContext(EngineContext);
