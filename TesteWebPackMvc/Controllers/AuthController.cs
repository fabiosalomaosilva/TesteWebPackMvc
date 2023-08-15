using Microsoft.AspNetCore.Mvc;

namespace TesteWebPackMvc.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


    }
}
