# run the test suite
test.all:
	npm run test
.PHONY: test.all

# run the test suite and re-run when files change
test.watch:
	npm run test:watch
.PHONY: test.watch