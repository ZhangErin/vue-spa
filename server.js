const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')
KoaBody({ multipart: true })
const Mock = require('mockjs')
const app = new Koa()
const router = new Router()
const shell = require('shelljs')

const fs = require('fs')
// var http = require('http');
// var https = require('https');

let Users = [];

for (let i = 0; i < 66; i++) {
	Users.push(Mock.mock({
		id: Mock.Random.guid(),
		name: Mock.Random.cname(),
		addr: Mock.mock('@county(true)'),
		'age|18-60': 1,
		birth: Mock.Random.date(),
		sex: Mock.Random.integer(0, 1)
	}));
}

//获取用户列表
router.get('/-/user/list', (ctx) => {
	let { name } = ctx.request.query;

	let mockUsers = Users.filter(user => {
		if (name && user.name.indexOf(name) == -1) return false;
		return true;
	});
	ctx.body = {
		users: mockUsers
	};

});

//获取用户列表（分页）
router.get('/-/user/listpage', (ctx) => {

	let { page, name } = ctx.request.query;
	
	let mockUsers = Users.filter(user => {
		if (name && user.name.indexOf(name) == -1) return false;
		return true;
	});
	let total = mockUsers.length;
	mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
	ctx.body = {
		total: total,
		users: mockUsers
	};
});

//删除用户
router.get('/-/user/remove', (ctx) => {
	let { id } = ctx.request.query;
	
	Users = Users.filter(u => u.id !== id);
	ctx.body = {
		code: 200,
		msg: '删除成功'
	};

});


//编辑用户
router.get('/-/user/edit', (ctx) => {
	let { id, name, addr, age, birth, sex } = ctx.request.query;

	Users.some(u => {
		if (u.id === id) {
			u.name = name;
			u.addr = addr;
			u.age = age;
			u.birth = birth;
			u.sex = sex;
			return true;
		}
	});

		ctx.body = {
			code: 200,
			msg: '编辑成功'
		};

});

//新增用户
router.get('/-/user/add', (ctx) => {
	let { name, addr, age, birth, sex } =ctx.request.query;
	
	Users.push({
		name: name,
		addr: addr,
		age: age,
		birth: birth,
		sex: sex
	});
	ctx.body = {
		code: 200,
		msg: '新增成功'
	};
});
//路由列表
const routerList = [
		{
			"path": "open",
			"name": "open",
			"component": "spa/open",
			"meta": {
				"title": "OPEN",
				"icon": "el-icon-goods"
			}
		},
	{
		"path": "spa",
		"name":"spa",
		"component": "spa/spa",
		"meta": {
			"title": "SPA",
			"icon": "el-icon-goods"
		}
	},
	{
		"path": "case",
		"name": "case",
		"meta": {
			"title": "案例",
			"icon": "el-icon-tickets"
		},
		"children": [
			{
				"path": "table",
				"name": "table",
				"component": "example/table",
				"meta": {
					"title": "表格",
					"icon": "el-icon-goods"
				}
			}, {
				"path": "rightMenu",
				"name": "rightMenu",
				"component": "example/rightMenu",
				"meta": {
					"title": "右键菜单",
					"icon": "el-icon-menu"
				}
			}, {
				"path": "form",
				"name": "form",
				"component": "form/form",
				"meta": {
					"title": "表单",
					"icon": "el-icon-setting"
				}
			}, {
				"path": "hasSubTab",
				"name": "hasSubTab",
				"component": "example/hasSubTab",
				"meta": {
					"title": "嵌套子页面",
					"icon": "el-icon-setting"
				}
			}, {
				"path": "dycSubTab",
				"name": "dycSubTab",
				"component": "example/dycSubTab",
				"meta": {
					"title": "动态子页面",
					"icon": "el-icon-setting"
				}
			}
			
		]
	}
];


router.get('/-/router/get', function (ctx) {

	ctx.body = { router: routerList }
})

router.post('/login', function (ctx) {
	ctx.body = {		
		name: 'admin',
		avatar: 'https://vue.awebide.com/img/user.png'
	}
})


router.get('/-/gitlog/get', function (ctx) {
	let _cmd = `git log --pretty=format:"%h - %an, %ar : %s"`;
	//let t = `git log  --pretty=format:'{"commit": "%h","author": "%an","date": "%ad","message": "%s"}'`
  
	ctx.body = {
		gitlog: new Promise((resolve, reject) => {
			shell.exec(_cmd, (code, stdout, stderr) => {
				console.log(stdout);
				if (code) {
					reject(stderr)
				} else {
					resolve(JSON.parse(stdout)[0])
				}
			})
		})
	}
})

router.get('/-/getMainList', function (ctx) {

	var mainList = {
	
			"result": [{
				"name": "AWEB 社区",
				"href": "https://www.awebide.com/"
			}, {
				"name": "AWEB 开发者中心",
				"href": "https://docs.awebide.com"
			}, {
				"name": "资源市场",
				"href": "https://market.awebide.com"
			}, {
				"name": "桌面示例",
				"href": "https://pc.awebide.com"
			}, {
				"name": "监控示例",
				"href": "https://monitor.awebide.com"
			}, {
				"name": "移动示例",
				"href": "https://mobile.awebide.com"
			}]
		
	};
	ctx.body = mainList;
})


//parser
app.use(KoaBody());

app.use(router.routes());

app.use(router.allowedMethods());

app.use(require('koa-static')(__dirname + '/public'))
//start server
// var options = {
// 	key: fs.readFileSync('./ssl/server.key'), //ssl文件路径
// 	cert: fs.readFileSync('./ssl/server.pem') //ssl文件路径
// };

// http.createServer(app.callback()).listen(80);
// https.createServer(options, app.callback()).listen(443);

app.listen(7008, () => {
	console.error(`服务器启动成功：7008`);
});


