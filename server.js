const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')
KoaBody({ multipart: true })
const Mock = require('mockjs')
const app = new Koa()
const router = new Router()



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
	console.log(name)
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
		"path": "spa",
		"name":"spa",
		"component": "spa/spa",
		"meta": {
			"title": "SPA",
			"icon": "el-icon-goods"
		}
	},
	{
		"path": "table",
		"name": "table",
		"meta": {
			"title": "表格",
			"icon": "el-icon-tickets"
		},
		"children": [
			{
				"path": "subPage",
				"name": "subPage",
				"component": "example/table",
				"meta": {
					"title": "表格",
					"icon": "el-icon-goods"
				}
			},
			{
				"path": "newPage",
				"name": "newPage",
				"component": "example/newPage",
				"meta": {
					"title": "子节点",
					"icon": "el-icon-goods"
				}
			}
		]
	}, {
		"path": "tree",
		"name": "tree",
		"component": "example/tree",
		"meta": {
			"title": "树形",
			"icon": "el-icon-menu"
		}
	},
	{
		"path": "index",
		"name": "index",
		"component": "form/form",
		"meta": {
			"title": "表单",
			"icon": "el-icon-setting"
		}
	}
];


router.get('/-/router/get', function (ctx) {

	ctx.body = { router: routerList }
})

router.post('/login', function (ctx) {
	ctx.body = {		
		name: 'admin',
		avatar: 'http://localhost:8080/img/user.png'
	}
})


//parser
app.use(KoaBody());

app.use(router.routes());

app.use(router.allowedMethods());

app.use(require('koa-static')(__dirname + '/public'))
//start server
app.listen(8086, () => {
	console.error(`服务器启动成功：localhost:${8086}`);
});


