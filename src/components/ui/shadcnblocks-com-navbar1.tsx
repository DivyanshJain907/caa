import * as React from "react";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=150&auto=format&fit=crop",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "#" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
  ],
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" },
  ],
  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "Sign up", url: "#" },
  },
}: Navbar1Props) => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4 md:px-8">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="h-12 w-auto object-contain"
                alt={logo.alt}
              />
              {logo.title && (
                <span className="text-lg font-semibold">{logo.title}</span>
              )}
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {auth?.login?.text && (
              <Button asChild variant="outline" size="sm">
                <a href={auth.login.url}>{auth.login.text}</a>
              </Button>
            )}
            {auth?.signup?.text && (
              <Button
                asChild
                size="default"
                className="bg-navy-900 text-white font-bold hover:bg-navy-800 shadow-md"
              >
                <a href={auth.signup.url}>{auth.signup.text}</a>
              </Button>
            )}
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="h-10 w-auto object-contain"
                alt={logo.alt}
              />
              {logo.title && (
                <span className="text-lg font-semibold">{logo.title}</span>
              )}
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-white sm:max-w-sm text-navy-900 border-none">
                <SheetHeader className="text-left">
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="h-10 w-auto object-contain"
                        alt={logo.alt}
                      />
                      {logo.title && (
                        <span className="text-lg font-semibold">
                          {logo.title}
                        </span>
                      )}
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-7"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {mobileExtraLinks && mobileExtraLinks.length > 0 && (
                    <div className="border-t py-4">
                      <div className="grid grid-cols-2 justify-start">
                        {mobileExtraLinks.map((link, idx) => (
                          <a
                            key={idx}
                            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy-900"
                            href={link.url}
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-3 mt-6">
                    {auth?.login?.text && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full text-base h-12"
                      >
                        <a href={auth.login.url}>{auth.login.text}</a>
                      </Button>
                    )}
                    {auth?.signup?.text && (
                      <Button
                        asChild
                        className="w-full text-base h-12 bg-navy-900 text-white font-bold hover:bg-navy-800 shadow-md"
                      >
                        <a href={auth.signup.url}>{auth.signup.text}</a>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="font-medium text-slate-600 hover:text-navy-900">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="w-96 p-4">
            <div className="grid gap-3">
              {item.items.map((subItem) => (
                <a
                  key={subItem.title}
                  className="flex gap-3 rounded-lg p-3 leading-none bg-white no-underline outline-none transition-colors hover:bg-slate-50 hover:text-navy-900 border border-transparent hover:border-slate-200 group"
                  href={subItem.url}
                >
                  <div className="shrink-0 text-slate-400 group-hover:text-gold">
                    {subItem.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-navy-900">
                      {subItem.title}
                    </div>
                    {subItem.description && (
                      <p className="text-xs leading-snug text-slate-600 mt-1">
                        {subItem.description}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <a
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy-900"
      href={item.url}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-2 text-lg font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-slate-100 hover:text-navy-900"
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-base font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-slate-600 mt-1">
                    {subItem.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="font-semibold block py-2 text-lg"
    >
      {item.title}
    </a>
  );
};

export { Navbar1 };
