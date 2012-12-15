from django.conf.urls.defaults import patterns, include, url
from TestBobylev.tests import views
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	(r'^admin/',include(admin.site.urls)),
    (r'^numbers/$',views.numbers),
    (r'^triangles/$',views.triangles),
)
