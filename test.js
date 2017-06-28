import fs from 'fs';
import test from 'ava';
import tmpdir from 'os-random-tmpdir';
import fontGot from './';

var tmp = tmpdir('got-google-fonts');

test('pass', t => {
	return fontGot(tmp, 'Droid Sans', {
		variant: 'regular'
	})
	.then(res => {
		t.true(res.length > 0);
		t.true(fs.existsSync(res[0]));
	}, () => {
		t.fail('Failed');
	});
});

test('fail', t => {
	return fontGot(tmp, 'HTTP400')
	.then(() => {
		t.fail('Failed');
	}, (err) => {
		t.true(err.statusCode === 400);
	});
});
