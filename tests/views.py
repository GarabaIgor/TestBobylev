# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse,Http404,HttpResponseRedirect
from django.template.loader import render_to_string
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
	imgs_ind_all = range(1,25)
	img_to_find_ind = []
	img_src_list = []

	path = "/static/tr_images/"	

	if request.is_ajax():
		random.shuffle(imgs_ind_all)
		for x in imgs_ind_all:
			img_src_list.append(path + str(x) + ".jpg")
		result_list = zip(img_src_list,imgs_ind_all)
		html =  render_to_string('Triangles_only_table.html',{"result_list":result_list},context_instance=RequestContext(request))
		html = " ".join(html.split())
		return HttpResponse(html,mimetype="application/html")
	else:
		if request.method == 'GET':
			try:
				
				for x in range(1,7):
					tmp_number = random.choice(imgs_ind_all)
					img_src_list.append(path + str(tmp_number) + ".jpg")
					img_to_find_ind.append(tmp_number)
					imgs_ind_all.remove(tmp_number)
				request.session['img_to_find_ind'] = img_to_find_ind
				result_list = zip(img_src_list,img_to_find_ind)
				return render_to_response('Triangles.html',{"result_list":result_list},context_instance=RequestContext(request))
			except Exception,e:
				print e
	
		else:
			return HttpResponse()


#Сравнить результаты полученного ids_arr с request.session['img_to_find_ind']				
def triangles_results(request):
	if request.is_ajax():
		print type(request.POST.get('ids_arr'))
		print request.POST.get('ids_arr')
		print type(request.session['img_to_find_ind'])
		print request.session['img_to_find_ind']






