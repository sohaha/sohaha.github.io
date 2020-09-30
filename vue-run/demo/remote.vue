<template>
	<div class="main">
		{{ text }}
		<hr>
		<router-link to="/">点击返回</router-link>
    <hr>
		<clazy-load src="https://unsplash.it/500">
			<img src="https://unsplash.it/500">
			<div
				class="preloader"
				slot="placeholder"
			>
				Loading message
			</div>
		</clazy-load>
	</div>
</template>

<style>
.main {
	text-align: center;
	color: #41adff;
}
</style>

<script>
const text = 'This is Remote Component';
export default load({
	js: [
		'//cdn.jsdelivr.net/npm/vue-clazy-load@0.4.2/dist/vue-clazy-load.min.js',
	],
}).then(async () => {
	return {
		data() {
			return {
				text,
			};
		},
	};
});
</script>