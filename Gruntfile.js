module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch : {
            scripts: {
                files: ['scripts/src/*.js', '!**/*.min.js'],
                tasks: ['jshint', 'babel', 'browserify'],
                options: {

                }
            },
            styles : {
                files: ['css/src/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {

                }
            }
        },
        sass : {
            development: {
                options : {

                },
                files : {
                    'css/styles.css': 'css/src/*.scss'
                }
            }
        },
        cssmin : {
            options : {

            },
            target: {
                files : [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        jshint: {
            all: [
                'scripts/src/*.js',
                'tests/*.js'
            ]
        },
        jasmine : {
            src : 'scripts/*.js',
            options : {
                specs : 'tests/*.js'
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd:  'scripts/src/',
                    src: ['*.js'],
                    dest: 'scripts/src/babel/',
                    ext: '.js'
                }]
            }
        },
        browserify: {
            dist: {
                options: {
                    banner: '/* \n' +
                    '  * \n' +
                    '  *  <%= pkg.name %> \n' +
                    '  *  <%= pkg.author %> \n' +
                    '  *  v<%= pkg.version %> \n' +
                    '  *  <%= grunt.template.today("dd/mm/yyyy") %> \n' +
                    '  * \n' +
                    '  */' +
                    '\n\n',
                    transform: [["babelify"]],
                    browserifyOptions: {
                        standalone: '<%= pkg.name %>'
                    }
                },
                files: {
                    "scripts/<%= pkg.name %>.js": "scripts/src/babel/*.js"
                }
            }
        },
        uglify: {
            options: {
                banner: '/* \n' +
                '  * \n' +
                '  *  <%= pkg.name %> \n' +
                '  *  <%= pkg.author %> \n' +
                '  *  v<%= pkg.version %> \n' +
                '  *  <%= grunt.template.today("dd/mm/yyyy") %> \n' +
                '  * \n' +
                '  */' +
                '\n\n',
                mangle: true
            },
            build: {
                src: ['scripts/*.js', '!scripts/src/*.js', '!scripts/lib/*.js', '!scripts/babel/*.js'],
                dest: 'scripts/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-notify');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('init', ['sass', 'cssmin', 'uglify']);
};