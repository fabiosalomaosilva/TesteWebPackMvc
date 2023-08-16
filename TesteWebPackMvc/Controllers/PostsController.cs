using Microsoft.AspNetCore.Mvc;

namespace TesteWebPackMvc.Controllers
{
    public class PostsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
