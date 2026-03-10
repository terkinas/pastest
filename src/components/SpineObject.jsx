import Spline from "@splinetool/react-spline";

export default function SpineObject() {
  return (
    <main className="  translate-y-1/3 h-screen w-screen">
      <Spline
        style={{ overflow: "visible" }}
        className="absolute w-full h-full"
        scene="https://prod.spline.design/n8kd6taGnYwwFGcM/scene.splinecode"
      />
      {/* <div className="w-48 h-12 bg-red-500"></div> */}
    </main>
  );
}
