# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse,Http404,HttpResponseRedirect
import random

def numbers(request):
	tableValuesRange = 100
	tableInd = 25
	if request.method == 'GET':
		table_values = random.sample(range(tableValuesRange),tableInd)
		table_indexes = range(tableInd)
		random.shuffle(table_values)
	return render_to_response('Numbers.html',{'table':table_values,'index':table_indexes},context_instance=RequestContext(request))

def triangles(request):
	if request.method == 'GET':
		img_src_ind_all = range(1,25)
		img_to_find_ind = []
		img_src_list = []
		path = "/static/tr_images/"	
		for x in range(1,7):
			print img_src_ind_all
			tmp_number = random.choice(img_src_ind_all)
			print "tmp:"
			print tmp_number
			img_src_list.append(path + str(tmp_number) + ".jpg")
			img_to_find_ind.append(tmp_number)
			img_src_ind_all.remove(tmp_number)
			print img_src_ind_all
		print img_to_find_ind
		return render_to_response('Triangles.html',{"imgs_to_find":img_src_list},context_instance=RequestContext(request))
	else:
		return HttpResponse()
				
