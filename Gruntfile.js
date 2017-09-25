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
            },
            images : {
                files: ['assets/*.png', 'assets/blog/*.png', 'assets/blogalongabond/*.png'],
                tasks: ['resize_crop'],
                options: {

                }
            }
        },
        sass : {
            development: {
                options : {

                },
                files : {
                    'css/styles.css': 'css/src/base.scss'
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
                    transform: [['babelify']],
                    browserifyOptions: {
                        standalone: '<%= pkg.name %>'
                    }
                },
                files: {
                    'scripts/<%= pkg.name %>.js' : 'scripts/src/babel/*.js'
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
        },
        resize_crop: {
            mobile: {
                options: {
                    height: 740,
                    width: 420
                },
                files: {
                    'assets/mobile': [
                        'assets/*.png'
                    ],
                    'assets/mobile/blog': [
                        'assets/blog/*.png',
                        '!assets/blog/update-2017.png',
                        '!assets/blog/game-of-thrones-s7.png'
                    ],
                    'assets/mobile/blogalongabond': [
                        'assets/blogalongabond/*.png'
                    ]
                }
            },
            thumb: {
                options: {
                    height: 240,
                    width: 480
                },
                files: {
                    'assets/thumbs/blogalongabond': [
                        'assets/blogalongabond/*.png'
                    ]
                }
            },
            mobile_offset_right: {
                options: {
                    height: 740,
                    width: 420,
                    gravity: 'east'
                },
                files: {
                    'assets/mobile': [
                        'assets/blogalongabond.png'
                    ],
                    'assets/mobile/blog': [
                        'assets/blog/update-2017.png',
                        'assets/blog/game-of-thrones-s7.png'
                    ]
                }
            },
            mobile_offset_left: {
                options: {
                    height: 740,
                    width: 420,
                    gravity: 'west'
                },
                files: {
                    'assets/mobile': [

                    ],
                    'assets/mobile/blog': [

                    ]
                }
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
    grunt.loadNpmTasks('grunt-resize-crop');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('init', ['sass', 'cssmin', 'jshint', 'babel', 'browserify']);
};
