import Navigation from "@/components/Navigation"
export default function Community() {
  return (
    <>
      <Navigation displayTab={true} dispalySearch={true} />
      {/*test navigation when page scrolls*/ }
      <div style={{minHeight: '10000px', width: '1080px'}}>
      </div>
    </>
  );
}
