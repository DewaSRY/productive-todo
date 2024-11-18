"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[248],{3767:(D,g,o)=>{o.d(g,{u:()=>k});var a=o(1562),f=o(4438),h=o(5312),x=o(4412),y=o(7673),t=o(6354),b=o(8141);let k=(()=>{class l{endpoint=`${h.c.domain}/user`;user$=new x.t(null);services={httpClient:(0,f.WQX)(a.Qq)};getUserSignedin(){const{httpClient:s}=this.services;return null!==this.user$.value?(0,y.of)(this.user$.value):s.get(this.endpoint+"/signin").pipe((0,t.T)(e=>e.data)).pipe((0,b.M)(e=>this.user$.next(e)))}postUserRegister(s){const{httpClient:e}=this.services;return null!==this.user$.value?(0,y.of)(this.user$.value):e.post(this.endpoint+"/signup",s).pipe((0,t.T)(i=>i.data)).pipe((0,b.M)(i=>this.user$.next(i)))}postUserLogin(s){const{httpClient:e}=this.services;return null!==this.user$.value?(0,y.of)(this.user$.value):e.post(this.endpoint+"/login",s).pipe((0,t.T)(i=>i.data)).pipe((0,b.M)(i=>this.user$.next(i)))}deleteLogout(){const{httpClient:s}=this.services;return s.delete(this.endpoint+"/logout").pipe((0,b.M)(()=>this.user$.next(null)))}postUniqueUserProperty(s){const{httpClient:e}=this.services;return e.post(this.endpoint+"/unique-property",s)}static \u0275fac=function(e){return new(e||l)};static \u0275prov=f.jDH({token:l,factory:l.\u0275fac,providedIn:"root"})}return l})()},6956:(D,g,o)=>{o.r(g),o.d(g,{IndexModule:()=>R});var a=o(177),f=o(8834),h=o(3902),x=o(9213),y=o(803),t=o(4438),b=o(3767),k=o(6618),l=o(8516);function O(n,p){1&n&&(t.j41(0,"button",36),t.EFF(1," MY TODO "),t.k0s())}function s(n,p){1&n&&(t.j41(0,"button",37),t.EFF(1," Create My Accoutn "),t.k0s())}function e(n,p){if(1&n&&(t.j41(0,"mat-list-item",16),t.nrm(1,"span",38),t.j41(2,"div",39),t.EFF(3),t.k0s()()),2&n){const d=p.$implicit;t.R7$(3),t.JRh(d)}}function i(n,p){1&n&&(t.j41(0,"button",40),t.EFF(1," Manage MY TODO "),t.k0s())}function r(n,p){1&n&&(t.j41(0,"button",41),t.EFF(1," Create My TODO Accoutn "),t.k0s())}function v(n,p){if(1&n&&(t.j41(0,"li",27)(1,"div",42)(2,"h4",43),t.EFF(3),t.k0s()(),t.j41(4,"p",44),t.EFF(5),t.k0s()()),2&n){const d=p.$implicit;t.R7$(3),t.SpI(" ",d.title," "),t.R7$(2),t.JRh(d.description)}}function u(n,p){if(1&n&&(t.j41(0,"ol",29)(1,"div",42)(2,"h4",43),t.EFF(3),t.k0s()(),t.j41(4,"p",45),t.EFF(5),t.k0s()()),2&n){const d=p.$implicit,m=p.$index;t.R7$(3),t.Lme(" ",m+1," ",d.title," "),t.R7$(2),t.JRh(d.description)}}const w=["Simplify and organize your daily to-do list to make tackling tasks less overwhelming and more manageable.","Prioritize what truly matters and stay on track with a clear, distraction-free interface.","Build consistent habits by setting achievable goals and monitoring your daily progress.","Break big tasks into smaller, actionable steps to keep moving forward without feeling stuck."],c=[{title:"Simplify Your Task Management",description:"Productive TODO makes organizing your tasks effortless with a clean and intuitive design, so you can focus on getting things done instead of feeling overwhelmed."},{title:"Stay Consistent and Track Progress",description:"Build productive habits by breaking tasks into manageable steps and seeing your achievements clearly, helping you stay motivated every day."},{title:"Boost Efficiency Without Distractions",description:"With no unnecessary features or clutter, Productive TODO helps you stay focused on what truly matters, making your productivity journey smoother and stress-free."}],F=[{title:"Register and Log In",description:"Start by signing up with your email and creating a password. After registering, log in to your account to access your personal task management dashboard."},{title:"Add a To-Do",description:"To create a new task, simply click the Add Task button. Enter a clear title for the task, add a detailed description if necessary, set a due date, and click Save to add it to your to-do list."},{title:"View and Update Task Details",description:"Click on any task to view its full details, such as the description and due date. You can update, edit, or make changes as needed to ensure it stays accurate and relevant."},{title:"Mark Task as Completed",description:"Once you\u2019ve finished a task, mark it as Completed by toggling the status. This will help you track your progress and keep your to-do list organized and up-to-date."}],T=[{path:"",component:(()=>{class n{service={authServices:(0,t.WQX)(b.u)};$user=this.service.authServices.user$.asObservable();problems=w;whyUs=c;howToUse=F;static \u0275fac=function(m){return new(m||n)};static \u0275cmp=t.VBU({type:n,selectors:[["app-home"]],decls:77,vars:8,consts:[["dashboardAct",""],[1,"min-h-[800px]","bg-natural-two","rounded","shadow-xl","flex","items-center","justify-center"],[1,"max-w-5xl","mx-auto","px-4"],[1,"grid","lg:grid-cols-2"],[1,"max-w-[600px]","px-4"],[1,""],[1,"text-primary-three"],[1,"mt-[50px]"],[1,"mt-16"],["role","link","class","w-11/12 mx-auto py-4 px-8 font-bold text-slate-700  rounded-lg shadow-lg bg-primary-two hover:bg-primary-three/50 duration-300 ease-out ",4,"ngIf","ngIfElse"],[1,"hidden","lg:flex","items-end","justify-end"],["src","assets/logo.png","alt","my-logo","width","400","height","600"],[1,"py-4","lg:min-h-[600px]","flex","justify-center","items-center","rounded-lg"],[1,"px-4","max-w-5xl","mx-auto"],[1,"my-2"],[1,"mt-[40px]"],[1,"relative"],[1,"my-10","py-24","lg:min-h-[600px]","lg:py-4","rounded-lg"],[1,"lg:grid","lg:grid-cols-2"],[1,"mb-10"],[1,"block","my-2","ml-4","max-w-[600px]","text-text/90"],[1,"mt-16","flex","flex-col","justify-start","items-start","gap-4"],["href","https://www.linkedin.com/in/dewa-surya/","target","_blank","mat-button","",1,""],["name","move-right",1,"inline-block","ml-2"],["role","link","class","w-[calc(min(600px,90%))] lg:w-full  py-4 px-8 font-bold text-slate-700  rounded-lg shadow-lg bg-primary-two hover:bg-primary-three/50 duration-300 ease-out ",4,"ngIf","ngIfElse"],[1,"px-4","max-w-7xl","mx-auto"],[1,"grid","lg:grid-cols-3","gap-4"],[1,"px-4","py-16","border","rounded","hover:bg-primary-two/50","duration-300","ease-out"],[1,"bg-text/80","h-2","max-w-[800px]"],[1,"mb-12"],[1,"bg-natural-three"],[1,"max-w-5xl","mx-auto","pt-12","pb-[150px]","px-4"],[1,"text-text/90","mt-8"],[1,"bg-text"],[1,"mx-auto","py-8","px-4"],[1,"text-2xl","text-primary-one"],["role","link",1,"w-11/12","mx-auto","py-4","px-8","font-bold","text-slate-700","rounded-lg","shadow-lg","bg-primary-two","hover:bg-primary-three/50","duration-300","ease-out"],[1,"w-11/12","mx-auto","py-4","px-8","font-bold","text-slate-700","rounded-lg","shadow-lg","bg-secondary-two","hover:bg-secondary-three/50","duration-300","ease-out"],[1,"block","w-[15px]","h-[15px]","hover:brightness-50","duration-200","bg-gray-600/90","absolute","left-0","top-1/2","-translate-y-1/2"],["matListItemTitle","",1,"ml-4"],["role","link",1,"w-[calc(min(600px,90%))]","lg:w-full","py-4","px-8","font-bold","text-slate-700","rounded-lg","shadow-lg","bg-primary-two","hover:bg-primary-three/50","duration-300","ease-out"],[1,"w-[calc(min(600px,90%))]","lg:w-full","py-4","px-8","font-bold","text-slate-700","rounded-lg","shadow-lg","bg-secondary-two","hover:bg-secondary-three/50","duration-300","ease-out"],[1,"ml-4"],[1,"break-words","text-text/60"],[1,"px-4","mt-8","text-text/90"],[1,"pl-6","mt-2","text-text/90","max-w-[800px]"]],template:function(m,E){if(1&m&&(t.nrm(0,"app-navigation"),t.j41(1,"main",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h1",5),t.EFF(6," Planing your day wiht "),t.j41(7,"span",6),t.EFF(8," Productive TODO "),t.k0s()(),t.j41(9,"p",7),t.EFF(10," Productive TODO helps you stay on top of your tasks with a simple, clear, and intuitive design made just for you "),t.k0s(),t.j41(11,"div",8),t.DNE(12,O,2,0,"button",9),t.nI1(13,"async"),t.DNE(14,s,2,0,"ng-template",null,0,t.C5r),t.k0s()(),t.j41(16,"div",10),t.nrm(17,"img",11),t.k0s()()()(),t.j41(18,"section",12)(19,"div",13)(20,"h2"),t.EFF(21," Stay Organized, Focused, and Productive "),t.k0s(),t.j41(22,"p",14),t.EFF(23," Discover How Productive TODO Solves Common Productivity Challenges and Helps You Stay Organized, Focused, and Consistently Achieve Your Goals "),t.k0s(),t.j41(24,"div",15)(25,"mat-list"),t.Z7z(26,e,4,1,"mat-list-item",16,t.Vm6),t.k0s()()()(),t.j41(28,"section",17)(29,"div",13)(30,"div",18)(31,"h2",19),t.EFF(32," Take Control of Your Day Effortlessly "),t.k0s(),t.j41(33,"p",20),t.EFF(34," We all know how hard it can be to keep up with everything life throws at us. That's where Productive TODO comes in. It\u2019s not just another to-do list\u2014it\u2019s a tool that works with you, helping you focus on what matters most. From organizing tasks to tracking your progress, this app simplifies your day so you can achieve more without feeling overwhelmed. No complicated features, no distractions\u2014just a straightforward way to stay productive and in control. Whether it\u2019s work, personal goals, or daily errands, Productive TODO makes it easy to get things done. "),t.k0s()(),t.j41(35,"div",21)(36,"a",22),t.EFF(37," Dewa Surya Ariesta "),t.nrm(38,"lucide-icon",23),t.k0s(),t.DNE(39,i,2,0,"button",24),t.nI1(40,"async"),t.DNE(41,r,2,0,"ng-template",null,0,t.C5r),t.k0s()()(),t.j41(43,"section",17)(44,"div",25)(45,"h2",5),t.EFF(46," Why use "),t.j41(47,"span",6),t.EFF(48," Productive TODO ? "),t.k0s()(),t.j41(49,"div",15)(50,"ul",26),t.Z7z(51,v,6,2,"li",27,t.Vm6),t.k0s()()()(),t.j41(53,"section",17)(54,"div",25)(55,"h2",5),t.EFF(56," How to use "),t.j41(57,"span",6),t.EFF(58," Productive TODO ? "),t.k0s()(),t.nrm(59,"hr",28),t.j41(60,"div",15)(61,"ul",5),t.Z7z(62,u,6,3,"ol",29,t.Vm6),t.k0s()()()(),t.j41(64,"footer")(65,"div",30)(66,"div",31)(67,"h2"),t.EFF(68," About Us "),t.k0s(),t.j41(69,"p",32),t.EFF(70,' "Productive TODO is designed to help you stay organized and achieve your goals. With an intuitive task management system, we make productivity simple and effective." '),t.k0s()()(),t.j41(71,"div",33)(72,"div",34)(73,"a",22)(74,"span",35),t.EFF(75," Dewa Surya Ariesta "),t.k0s(),t.nrm(76,"lucide-icon",23),t.k0s()()()()),2&m){const j=t.sdS(15);t.R7$(12),t.Y8G("ngIf",t.bMT(13,4,E.$user))("ngIfElse",j),t.R7$(14),t.Dyx(E.problems),t.R7$(13),t.Y8G("ngIf",t.bMT(40,6,E.$user))("ngIfElse",j),t.R7$(12),t.Dyx(E.whyUs),t.R7$(11),t.Dyx(E.howToUse)}},dependencies:[a.bT,k.e,f.It,h.jt,h.YE,h.yE,l.WGl,a.Jj]})}return n})()}];let C=(()=>{class n{static \u0275fac=function(m){return new(m||n)};static \u0275mod=t.$C({type:n});static \u0275inj=t.G2t({imports:[y.iI.forChild(T),y.iI]})}return n})();var M=o(8177);let R=(()=>{class n{static \u0275fac=function(m){return new(m||n)};static \u0275mod=t.$C({type:n});static \u0275inj=t.G2t({imports:[a.MD,C,M.R,f.Hl,h.Fg,x.m_,l.flO.pick({MoveRight:l.gUh})]})}return n})()},5312:(D,g,o)=>{o.d(g,{c:()=>a});const a={production:!1,domain:"http://localhost:8000/api"}},9079:(D,g,o)=>{o.d(g,{pQ:()=>x});var a=o(4438),f=o(1985),h=o(6977);function x(s){s||((0,a.Af3)(x),s=(0,a.WQX)(a.abz));const e=new f.c(i=>s.onDestroy(i.next.bind(i)));return i=>i.pipe((0,h.Q)(e))}}}]);