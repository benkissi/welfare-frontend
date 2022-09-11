import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/dashboard/home/Home.vue";
import LoginView from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Dashboard from "../views/dashboard/Index.vue";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "/contributions",
          name: "contributions",
          component: HomeView,
        },
        {
          path: "/settings",
          name: "settings",
          component: () => import("../views/dashboard/settings/Index.vue"),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/onboarding",
      name: "onboarding",
      component: () => import("../views/onboarding/Onboarding.vue"),
      children: [
        {
          path: "/onboarding/company-information",
          name: "companyInfoStep",
          component: () => import("../views/onboarding/CompanyInfo.vue"),
        },
        {
          path: "/onboarding/invite-managers",
          name: "inviteManagersStep",
          component: () => import("../views/onboarding/InviteManagers.vue"),
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

router.beforeEach((to) => {
  const store = useAuthStore();

  if (to.meta.requiresAuth && !store.userToken) return "/login";
});

export default router;
