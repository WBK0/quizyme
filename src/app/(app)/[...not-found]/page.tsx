import NotFound from "@/components/404/404";

const NotFoundSite = () => {
  return (
    <div>
      <NotFound 
        message="Sorry, the page you are looking for does not exist!"
        redirectTo="home"
        url="/"
      />
    </div>
  )
}
export default NotFoundSite