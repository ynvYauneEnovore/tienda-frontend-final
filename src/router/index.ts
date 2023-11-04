import { createRouter, createWebHistory } from "vue-router";
import PanelView from "@/views/PanelView.vue";
import LoginView from "@/views/LoginView.vue";
import LandingView from "@/views/LandingView.vue";
import ProductoView from "@/views/ProductoView.vue";
import CatproductoView from "@/views/catproductoView.vue";

import AyudaView from "@/views/AyudaView.vue";
import { useAuthStore } from "@/stores";
import { getTokenFromLocalStorage } from "@/helpers";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
    },

    {
      path: "/ayuda",
      name: "ayduda",
      component: AyudaView,
    },

    {
      path: "/panel",
      name: "panel",
      component: PanelView,
      children: [
        {
          path: "",
          component: () => import("../components/dasboard/DashboardView.vue"),
        },
        {
          path: "productos",
          component: ProductoView,
          children: [
            {
              path: "ver",
              component: () =>
                import("../components/producto/ProductoList.vue"),
            },
            {
              path: "crear",
              component: () =>
                import("../components/producto/ProductoCreate.vue"),
            },
          ],
        },

        {
          path: "verCategorias",
          component: CatproductoView,
          children: [
            {
              path: "ver",
              component: () =>
              import("../components/catproducto/CatProductoList.vue"),
            },

            {
              path: "crear",
              component: () =>
              import("../components/catproducto/CatProductoCreate.vue"),
            },
          ],
        },
      ],
    },

    {
      path: "/crearproducto",
      component: () => import("../components/producto/ProductoCreate.vue"),
    },

    { path: "/login", name: "login", component: LoginView },
    {
      path: "/catproducto",
      name: "catproducto",
      component: () => import("../views/catproductoView.vue"),
      children: [
        {
          path: "",
          component: () =>
            import("../components/catproducto/CatProductoList.vue"),
        },
        {
          path: "crear",
          component: () =>
            import("../components/catproducto/CatProductoCreate.vue"),
        },
      ],
    },

    {
      path: "/producto",
      name: "producto",
      component: () => import("../views/productoView.vue"),
      children: [
        {
          path: "",
          component: () => import("../components/producto/ProductoList.vue"),
        },
        {
          path: "crear",
          component: () => import("../components/producto/ProductoCreate.vue"),
        },
      ],
    },

    {
      path: "/venta",
      name: "venta",
      component: () => import("../views/ProductoVentaView.vue"),
      children: [
        {
          path: "",
          component: () => import("../components/ventas/VentaList.vue"),
        },
        {
          path: "crear",
          component: () => import("../components/producto/ProductoCreate.vue"),
        },
      ],
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/login", "/landing", "/", "/ayuda"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout();
    authStore.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router;
